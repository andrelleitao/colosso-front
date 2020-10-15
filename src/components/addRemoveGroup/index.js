import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { GroupAPI } from '../../services/api/administration/group';

import './style.scss';

export default function AddRemoveGroup(props) {
    const [available, setAvailable] = useState([]);
    const [added, setAdded] = useState([]);
    const [id, setId] = useState(null);
            
    useEffect(() => {
        getGroups();  
    }, [props.added]);

    /**
     * Retorna os grupos do backend e filtra para identificar o que já foi adicionado
     * pelo usuário e separa entre as disponíveis e as que já foram adicionadas.
     */
    const getGroups = async () => {
        const response = await GroupAPI.index();
        const groups = response.data; // Correponde aos grupos de GroupAPI.index();        

        // Flag de controle que indica se o grupo não existe e pode ser adicionado.
        let notExists = false; 
        
        // Arrays que contém os grupos que ficarão em disponíveis e em adicionados.
        const availableTmp = [];
        const addedTmp = [];

        // Recebe os grupos que estão associados ao pai. Dessa forma o componente
        // deverá separar os grupos do available e added. Quem sabe quais são os grupos
        // que foram adicionadas é o pai e portanto ele deverá informá-las para que o 
        // componente possa realizar a separação entre available e added. 
        const groupsAddedToParent = props.added;
       
        for (var i = 0; i < groups.length; i++) {
            // Inicialmente aponta que não existe nos grupos do pai.
            notExists = true;

            // Teste que identifica se esse group já está na lista de adicionados
            // que foi fornecido pelo pai. Caso esteja não será adicionado em available e sim
            // em adde para serem exibidos de forma correta nas duas listas.
            for (var x = 0; x < groupsAddedToParent.length; x++) {
                if (groupsAddedToParent[x].id == groups[i].id) {
                    notExists = false;
                    break;
                }
            }

            if (notExists) {
                availableTmp.push(groups[i]);
            } else {
                addedTmp.push(groups[i]);
            }
        }

        // Atualiza os arrays para exibirem no select de adicionados e disponíveis. 
        // Se estiver dados em disponíveis ele já exibe e se tiver em adicionados já exibe também.
        setAvailable(availableTmp);
        setAdded(addedTmp);
    }

    /**
     * Armazena o id do grupo para poder realizar a operação de adicionar e remover. 
     * Dessa forma o componente consegue identificar e manipular o registro correto.
     * @param {*} e Utilizado para obter o id do grupo. 
     */
    const handleClick = (e) => {
        if (e.target.value !== '') {
            setId(e.target.value);
        }
    }

    /**
     * Identifica a role que será manipulada. 
     * Sempre será baseado nas roles disponíveis.
     * @param {*} id PK da role.
     * @param {*} list Array de roles. (available/added)
     */
    const getItem = (id, list) => {
        let item = null;

        // Identifica o item pelo id.
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                item = list[i];
                break;
            }
        }

        return item;
    }

    /**
     * Responsável por adicionar um item.
     */
    const add = () => {
        // Identifica o item através do ID e em seguida
        // o adicionará na lista de adicionados (added).
        let item = getItem(id, available);

        if (item != null) {
            added.push(item);
            removeItem(id, available, true); 
            props.setGroups(added); // Roles vindas do pai.
        }
    };

    /**
     * Remove o item da lista desejada. O item é identificado e o valor NULL
     * adicionado para que em seguida seja recriado o array.
     * @param {*} id ID do registro selecionado.
     * @param {*} list Lista para varredura.
     * @param {*} isAdd Informa se a operação é de adicionar. (true/false)
     */
    const removeItem = (id, list, isAdd) => {
        // Cria a nova lista sem os itens com o valor NULL.
        const newList = [];

        for (var i = 0; i < list.length; i++) {
            if (id != list[i].id) {
                newList.push(list[i]);
            }
        }

        // Se a operação for adicionar, será atualizado o array de disponíveis. (available)
        // Se a operação for de remover, será atualizado o array de adicionados. (added)
        if (isAdd) {
            setAvailable(newList);
        } else {            
            setAdded(newList);
        }

        return newList;
    }

    /**
     * Responsável por remover o item da lista de adicionados. (added)
     */
    const remove = () => {
        // Identifica o item através do ID e em seguida
        // o adicionará na lista de adicionados (added).
        let item = getItem(id, added);

        if (item != null) {
            available.push(item);
            const updatedList = removeItem(id, added, false);   
            props.setGroups(updatedList);         
        }
    }

    /**
     * Responsável por adicionar todos os itens na lista de adicionados.
     */
    const addAll = () => {
        for (var i = 0; i < available.length; i++) {
            added.push(available[i]);
        }

        setAvailable([]);

        // Permite que o pai saiba quais os roles 
        // selecionados no filho.
        props.setGroups(added);
    }

    /**
     * Responsável por remover todos os itens da lista de adicionados.
     */
    const removeAll = () => {
        for (var i = 0; i < added.length; i++) {
            available.push(added[i]);
        }

        setAdded([]);

        // Permite que o pai saiba quais os roles 
        // selecionados no filho.
        props.setGroups([]);
    }

    return (
        <Row className="addRemoveGroupContainer">
            <Col xs="5">
                <FormGroup>
                    <Label for="available"><Trans i18nKey={"component.addRemoveGroup.availableGroups"}></Trans></Label>
                    <List onClick={handleClick} list={available} />
                </FormGroup>
            </Col>
            <Col xs="2" className="align-self-center mt-3">
                <Row>
                    <Col className="mb-1"><Button type="button" color="primary" onClick={add}>{'>'}</Button></Col>
                </Row>
                <Row>
                    <Col className="mb-1"><Button type="button" color="primary" onClick={remove}>{'<'}</Button></Col>
                </Row>
                <Row>
                    <Col className="mb-1"><Button type="button" color="primary" onClick={addAll}>{'>>'}</Button></Col>
                </Row>
                <Row>
                    <Col><Button type="button" color="primary" onClick={removeAll}>{'<<'}</Button></Col>
                </Row>
            </Col>
            <Col xs="5">
                <FormGroup>
                    <Label for="added"><Trans i18nKey={"component.addRemoveGroup.addedGroups"}></Trans></Label>
                    <List onClick={handleClick} list={added} />
                </FormGroup>
            </Col>
        </Row>
    );
}

/**
 * Componente responsável por criar um select multiple a partir da lista informada. 
 */
const List = ({ list, onClick }) => {
    return (
        <Input type="select" multiple onClick={onClick} style={{ height: "200px" }}>
            {
                list.map((group) => {
                    return (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    );
                })
            }
        </Input>
    );
} 