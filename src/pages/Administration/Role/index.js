import React, { useState } from 'react';
import Crud from '../../../core/template/crud';
import { Row, Col, Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { RoleAPI } from '../../../services/api/administration/role';
import { TrueFalse } from '../../../core/constants/trueFalse';
import { BackendErrorNotification, FrontendNotification, NotificationType } from '../../../core/components/notification';
import { Trans, useTranslation } from 'react-i18next';
import { URL_ROLE } from '../../../services/api/administration';

export default function Role() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [isEnabled, setIsEnabled] = useState(true);

    // Guarda a ação search do componente Grid.
    // Com o armazenamento desse evento o usuário poderá 
    // utilizá-lo no momento que desejar.
    const refreshPage = () => {
        window.location.reload();
    }

    // Ao clica no ícone de editar do Grid,
    // esse método é acionado.
    const handleEdit = async (id) => {
        setLoading(true);
        let response = await RoleAPI.findById(id);

        // Carrega os dados na tela.
        setId(response.data.id);
        setName(response.data.name);
        setIsEnabled(response.data.isEnabled);

        setLoading(false);
    }

    // Responsável por acionar o método save que é responsável
    // por realizar a inserção ou a atualização da entidade.
    const handleSubmit = async (e) => {        
        e.preventDefault();

        if (isValid()) {
            setLoading(true);

            if (id != null && id !== '') {
                await RoleAPI.update(id, getData())
                    .then(() => refreshPage())
                    .catch((error) => BackendErrorNotification(error));
            } else {
                await RoleAPI.create(getData())
                    .then(() => refreshPage())
                    .catch((error) => BackendErrorNotification(error));
            }

            setLoading(false);
        }
    }

    // Evento de exclusão (Ícone lixeira)
    const handleDelete = async (id) => {
        setLoading(true);

        await RoleAPI.remove(id)
            .then(() => refreshPage())
            .catch(error => {
                BackendErrorNotification(error);
            });

        setLoading(false);
    }

    // Dados que serão enviados para o backend.
    // Normalmente estarão os dados digitados no formulário.
    const getData = () => {
        return {
            name: name,
            isEnabled: (isEnabled) ? TrueFalse.TRUE : TrueFalse.FALSE
        };
    }

    // Valida o fomulário
    const isValid = () => {
        let message = null;

        if (!name) {
            message = t('form.field.message.nameRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        return true;
    };

    // Colunas que serão exibidas no Grid.    
    const columns = [
        {
            key: "id",
            label: "Id",
            width: "5%"
        },
        {
            key: "name",
            label: "Name",
            width: "85%"
        }
    ];

    const filter = {
        field: "name",
        operation: "MATCH"
    };

    return (
        <>
            <Crud pageTitle={t("module.administration.role.title")}
                url={URL_ROLE}
                onClickEdit={handleEdit}
                onClickDelete={handleDelete}
                columns={columns}
                modalSearch={null}
                loading={loading}
                filter={filter}>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm="4">
                            <FormGroup>
                                <Label for="name"><Trans i18nKey={"form.field.name"} /></Label>
                                <Input type="text" name="name" id="name"
                                    onChange={e => setName(e.target.value)}
                                    value={name} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox"
                                        onClick={() => { setIsEnabled(!isEnabled) }}
                                        checked={isEnabled} /><Trans i18nKey={"form.field.enabled"} />
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <Button className="mr-2"><Trans i18nKey={"form.button.save"} /></Button>
                            <Button onClick={refreshPage}><Trans i18nKey={"form.button.cancel"} /></Button>
                        </Col>
                    </Row>
                </Form>

            </Crud>
        </>
    );
}