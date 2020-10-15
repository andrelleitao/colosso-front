import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink, Button, Input, Row, Col, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import api from '../../../../services/api';
import {
    faPencilAlt,
    faTrashAlt,
    faSearch,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CrudModalSearch from './crudModalSearch';
import { BackendErrorNotification } from '../../../components/notification';

/**
 * Responsável por montar o grid na tela.
 * 
 * @param {*} props Props do React.
 */
export default function CrudGrid(props) {
    // Responsável por realizar a tradução.
    const { t } = useTranslation();
    const [rows, setRows] = useState([]);
    const [columns] = useState(props.columns);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false); // Loading do grid
    const [filter] = useState(props.filter);
    const [advancedSearchFilters, setAdvancedSearchFilters] = useState(null);

    // Correponde ao ID do registro selecionado pelo usuário. O usuário fará uso
    // do ID em operação como Remover.
    const [entityId, setEntityId] = useState(null); // Guarda o id da entidade selecionada (linha do grid)
    const [modalDelete, setModalDelete] = useState(false); // Referente ao Modal Delete. (Quando o usuário clica no ícone de excluir)

    /**
     * Acionado toda vez que o usuário realizar 
     * um clique em um número de página.
     * @param {*} e É o evento.
     */
    const handlePages = (e) => {
        setCurrentPage(Number(e.target.id));
    };

    /**
     * Acionado toda vez que o usuário realizar 
     * um clique para a próxima página.     *
     */
    const handleNext = () => {
        currentPage === totalPages ? setCurrentPage(1) : setCurrentPage(currentPage + 1);
    };

    /**
     * Acionado toda vez que o usuário realizar 
     * um clique para a página anterior.     *
     */
    const handleBack = () => {
        currentPage === 1 ? setCurrentPage(totalPages) : setCurrentPage(currentPage - 1);
    };

    /**
     * Acionado toda vez que o usuário realizar 
     * um clique para última página.     *
     */
    const handleLast = () => {
        setCurrentPage(totalPages);
    };

    /**
     * Acionado toda vez que o usuário realizar 
     * um clique para a primeira página.     *
     */
    const handleFirst = () => {
        setCurrentPage(1);
    };

    /**
     * Toda vez que houver modificação faz uma nova redenrização.
     */
    useLayoutEffect(() => {
        if(advancedSearchFilters == null) {
            search();
        } else {
            // Os filtros são armazenados para poderem ser utilizados.
            // O advancedSearchFilters deve ser armazenado para a consulta
            // avançada poder ser utilizada.            
            advancedSearch(advancedSearchFilters);
        }
        
    }, [currentPage]);

    // ---------------------------------------------------------------
    // SEARCH
    // ---------------------------------------------------------------
    const handleClickSearch = () => {
        handleFirst();
        search();
    }

    const search = () => {
        // Reseta o valor do setAdvancedSearchFilters
        // para que a aplicação entenda que o filtro
        // avançado não está sendo utilizado.
        setAdvancedSearchFilters(null);

        // Controla a exibição do loading durante 
        // o carregamento do grid. 
        setLoading(true);

        // Filtros que serão utilizados na pesquisa.
        // Toda requisição de filtro deverá seguir a estrutura abaixo.        
        let requestFilter = {
            filters: [
                {
                    field: filter.field,
                    value: searchTerm,
                    operation: filter.operation
                }
            ],
            page: (currentPage - 1)
        };

        api.post(props.url + "/search", requestFilter)
            .then(res => {
                setRows(res.data.content);
                setTotalPages(res.data.totalPages);
            })
            .catch(error => {
                BackendErrorNotification(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const advancedSearch = (filters) => {
        // Controla a exibição do loading durante 
        // o carregamento do grid. 
        setLoading(true);
       
        // Dados que serão enviados para a API de busca avançada.
        let requestFilter = {
            filters: filters,
            page: (currentPage - 1)
        };

        api.post(props.url + "/search", requestFilter)
            .then(res => {
                setRows(res.data.content);
                setTotalPages(res.data.totalPages);

                // Informa que está usando a pesquisa avançada.                
                setAdvancedSearchFilters(filters);
            })
            .catch(error => {
                BackendErrorNotification(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // ---------------------------------------------------------------
    // EDIT
    // ---------------------------------------------------------------
    // Aciona o evento handleClickEdit que foi passado
    // pela tela da entidade.
    const handleClickEdit = (id) => {
        props.onClickEdit(id);

        // 2 -> Redireciona para a aba New
        props.onToggle("2");
    }

    // ---------------------------------------------------------------
    // DELETE
    // ---------------------------------------------------------------  
    const toggleDelete = () => {
        setModalDelete(!modalDelete)
    };

    // Responsável por abrir o modal solicitando
    // a confirmação de remoção do registro.
    const handleClickDelete = (id) => {
        setEntityId(id);

        // Guarda o id selecionado.
        setModalDelete(true);
    }

    // Ação de confirmação de exclusão do registro.
    // Em seguida aciona o evento onClickDelete que foi passado
    // pela tela da entidade.
    const handleClickConfirmDelete = () => {
        props.onClickDelete(entityId);

        // Restaura para os valores default para assim ter 
        // um novo começo de fluxo.
        restoreDefaultValuesDelete();
    }

    // Restaura os valores padrão para o entidade id e o modal delete
    // assim impede que fique gravado registros anteriores nos estados.
    const restoreDefaultValuesDelete = () => {
        setEntityId(null);
        setModalDelete(false);
    }

    const pagination = [];
    for (var number = 1; number <= totalPages; number++) {
        pagination.push(
            <PaginationItem
                className={(currentPage === number ? 'active' : '')}>
                <PaginationLink
                    id={number}
                    onClick={handlePages}>
                    {number}
                </PaginationLink>
            </PaginationItem>
        );
    }

    return (
        <>
            <Row>
                <Col sm="9" className="pl-0 pr-0 grid-searchCol1">
                    {
                        // Exibe o componente modalSearch apenas 
                        // se for identificado o conteúdo do modal
                        // passado no props do componente.
                        (props.modalSearch == null) ? ''
                            :
                            // Ao usar o props.onClick, em crudModalSearch,
                            // ele estará acionando a função advancedSearch desta classe.
                            <CrudModalSearch onClick={advancedSearch}>
                                {props.modalSearch}
                            </CrudModalSearch>
                    }
                </Col>
                <Col sm="3" className="pr-0 pl-0">
                    <InputGroup>
                        <Input
                            placeholder={t('field.search')}
                            onChange={e => setSearchTerm(e.target.value)} />
                        <InputGroupAddon addonType="append">
                            <Button onClick={handleClickSearch}><FontAwesomeIcon icon={faSearch} /></Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>

            {
                (loading) ?
                    <div className="text-center" style={{ marginTop: "10%" }}><FontAwesomeIcon icon={faSpinner} spin size="6x" /></div>
                    :
                    (rows.length === 0) ?
                        <div className="text-center mt-5">{t('crud.grid.noRecordsFound')}</div>
                        :
                        <>
                            <Table striped bordered size="sm" hover responsive>
                                <thead>
                                    <tr>
                                        {
                                            columns.map((column) => {
                                                return (
                                                    <th style={{width: column.width}}>{column.label}</th>
                                                );
                                            })
                                        }
                                        <th style={{ width: "10%" }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rows.map((row) => {
                                            let cells = [];
                                            let rowsArray = Object.entries(row);
                                            let columnsArray = Object.entries(columns);

                                            // Monta as colunas de acordo com o array columns 
                                            // obecendo a ordem da key.
                                            for (var x = 0; x < rowsArray.length; x++) {
                                                for (var i = 0; i < columnsArray.length; i++) {
                                                    if (columnsArray[i][1].key === rowsArray[x][0]) {
                                                        cells.push(
                                                            <td>{rowsArray[x][1]}</td>
                                                        );
                                                    }
                                                }
                                            }

                                            return (
                                                <tr>
                                                    {cells}

                                                    <td className="text-center noMargin">
                                                        <Button color="link" className="noMargin" onClick={() => handleClickEdit(row.id)}>
                                                            <FontAwesomeIcon icon={faPencilAlt} className="mr-3" />
                                                        </Button>
                                                        <Button color="link" className="noMargin" onClick={() => handleClickDelete(row.id)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>

                            {/* Componente de paginação */}
                            <Pagination aria-label="Page navigation example">
                                <PaginationItem disabled={((currentPage === 1) || (totalPages === 0)) ? true : false}>
                                    <PaginationLink first onClick={handleFirst} />
                                </PaginationItem>

                                <PaginationItem disabled={((currentPage === 1) || (totalPages === 0)) ? true : false}>
                                    <PaginationLink previous onClick={handleBack} />
                                </PaginationItem>

                                {pagination}

                                <PaginationItem disabled={((currentPage === totalPages) || (totalPages === 0)) ? true : false}>
                                    <PaginationLink next onClick={handleNext} />
                                </PaginationItem>
                                <PaginationItem disabled={((currentPage === totalPages) || (totalPages === 0)) ? true : false}>
                                    <PaginationLink last onClick={handleLast} />
                                </PaginationItem>
                            </Pagination>

                            {/* Modal por realizar a confirmação de exclusão do registro */}
                            <Modal isOpen={modalDelete} toggle={toggleDelete} backdrop={true}>
                                <ModalHeader toggle={toggleDelete}>{t("crud.modalDelete.title")}</ModalHeader>
                                <ModalBody>
                                    {t("crud.modalDelete.message")}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="success" onClick={handleClickConfirmDelete}>{t("button.yes")}</Button>{' '}
                                    <Button color="danger" onClick={toggleDelete}>{t("button.no")}</Button>
                                </ModalFooter>
                            </Modal>
                        </>
            }
        </>
    );
}