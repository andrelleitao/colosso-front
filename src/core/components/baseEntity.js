import React, { useState } from 'react';
import api from '../../services/api';
import { BackendErrorNotification, FrontendNotification, NotificationType } from './notification';
import { useTranslation } from 'react-i18next';

/**
 * Classe pai que deverá ser utilizado nos CRUD com o objetivo
 * de conter funções que são comuns a todas as telas de entidades (CRUDs).
 */
export default function BaseEntity(props) {
    const { t } = useTranslation();

    // Responsável por armazenar o método search
    // que é responsável por realizar pesquisa no Grid.
    // Método responsável por armazenar o callback do search do grid.
    // Após o armazenamento na variável callbackSearchGrid este poderá
    // ser acionado por qualquer método da classe. Esse método será acionado
    // quando o usuário clica nos ícones de Editar ou Remover do grid.
    const [callbackSearchGrid, setCallbackSearchGrid] = useState(null);
    const [loading, setLoading] = useState(false);

    // Armazena o ID da entidade que está manipulando.
    // É utilizado para operação de edição do registro.
    const [id, setId] = useState(null);

    function handleCallbackSearchGrid() {
        if (callbackSearchGrid != null) {
            callbackSearchGrid();
        }
    }

    /**
     * Responsável por retornar dados de uma entidade a partir do ID.
     * 
     * @param {*} url Serviço que será consumido.
     * @param {*} id Chave primária da entidade.
     */
    function loadEntity(url, id) {
        setLoading(true);
        let response = null;

        api.get(url + "/" + id)
            .then(res => {
                response = res;
            })
            .catch(error => {
                BackendErrorNotification(error);
            })
            .finally(() => {
                setLoading(false);
            });

        return response;
    }

    /**
     * Responsável por salvar ou alterar uma entidade.
     * 
     * @param {*} url Endereço do serviço.
     * @param {*} data Dados que serão enviados (JSON body).     * 
     */
    function saveEntity(url, data) {
        setLoading(true);

        if (id != null && id !== '') {
            api.put(url + "/" + id, data)
                .then(() => {
                    let message = t('message.entity.updatedSuccessfully');
                    FrontendNotification(message, NotificationType.SUCCESS);
                    this.handleCallbackSearchGrid();
                })
                .catch(error => {
                    BackendErrorNotification(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            api.post(url, data)
                .then(() => {
                    let message = t('message.entity.createdSuccessfully');
                    FrontendNotification(message, NotificationType.SUCCESS);
                })
                .catch(error => {
                    BackendErrorNotification(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    return (props.children);
}