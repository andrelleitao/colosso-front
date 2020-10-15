import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import AddRemoveGroup from '../../../components/addRemoveGroup';
import AddRemoveRole from '../../../components/addRemoveRole';
import SelectGender from '../../../components/selectGender';
import { EMAIL_MAXLENGTH, PASSWORD_DEFAULT_VALUE, PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH } from '../../../constants/field';
import { BackendErrorNotification, FrontendNotification, NotificationType } from '../../../core/components/notification';
import { TrueFalse } from '../../../core/constants/trueFalse';
import Crud from '../../../core/template/crud';
import { URL_USER } from '../../../services/api/administration';
import { UserAPI } from '../../../services/api/administration/user';

export default function User() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');

    const [isEnabled, setIsEnabled] = useState(true);
    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);



    const refreshPage = () => {
        window.location.reload();
    }

    const handleEdit = async (id) => {
        setLoading(true);
        let response = await UserAPI.findById(id);

        // Carrega os dados na tela.
        setId(response.data.id);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setDateBirth(response.data.dateBirth);        
        setIsEnabled(response.data.isEnabled);
        setPassword(PASSWORD_DEFAULT_VALUE);
        setPasswordConfirmation(PASSWORD_DEFAULT_VALUE);
        setGender(response.data.gender);

        // Roles que foram adicionados ao grupo.
        // Esses roles deverão ser passados para o componente
        // para que este possa montar os arrays de forma correto
        // com os que já foram adicionados e quais estariam disponíveis.
        const addedRoles = [];
        response.data.roles.map((role) => {
            addedRoles.push(role);
        });

        setRoles(addedRoles);

        const addedGroups = [];
        response.data.groups.map((group) => {
            addedGroups.push(group);
        });

        setGroups(addedGroups);

        setLoading(false);
    }

    // Responsável por acionar o método save que é responsável
    // por realizar a inserção ou a atualização da entidade.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isValid()) {
            setLoading(true);

            // Se o id estiver preenchido a aplicação entenderá que é
            // uma atualização de registro.
            if (id != null && id !== '') {
                await UserAPI.update(id, getData())
                    .then(() => refreshPage())
                    .catch((error) => BackendErrorNotification(error));
            } else {
                await UserAPI.create(getData())
                    .then(() => refreshPage())
                    .catch((error) => BackendErrorNotification(error));
            }

            setLoading(false);
        }
    }

    // Evento de exclusão (Ícone lixeira)
    const handleDelete = async (id) => {
        setLoading(true);

        await UserAPI.remove(id)
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
            firstName: firstName,
            lastName: lastName,
            dateBirth: dateBirth,
            gender: gender,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
            isEnabled: (isEnabled) ? TrueFalse.TRUE : TrueFalse.FALSE,
            roles: roles,
            groups: groups
        };
    }

    // Valida o fomulário
    const isValid = () => {
        let message = null;

        if (!firstName) {
            message = t('form.field.message.firstNameRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        if (!lastName) {
            message = t('form.field.message.lastNameRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        if (!dateBirth) {
            message = t('form.field.message.dateBirthRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        if (!gender) {
            message = t('form.field.message.genderRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        if (!email) {
            message = t('form.field.message.emailRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        if (!password) {
            message = t('form.field.message.passwordRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        if (!passwordConfirmation) {
            message = t('form.field.message.passwordConfirmationRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        if (passwordConfirmation != password) {
            message = t('form.field.message.invalidPasswordConfirmation');
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
            key: "firstName",
            label: t("form.field.firstName"),
            width: "15%"
        },
        {
            key: "lastName",
            label: t("form.field.lastName"),
            width: "15%"
        },
        {
            key: "email",
            label: t("form.field.email"),
            width: "5%"
        },
        {
            key: "gender",
            label: t("form.field.gender"),
            width: "5%"
        },
        {
            key: "isActive",
            label: t("form.field.active"),
            width: "5%"
        }
    ];

    const filter = {
        field: "firstName",
        operation: "MATCH"
    };

    return (
        <>
            <Crud pageTitle={t("module.administration.user.title")}
                url={URL_USER}
                onClickEdit={handleEdit}
                onClickDelete={handleDelete}
                columns={columns}
                modalSearch={null}
                loading={loading}
                filter={filter}>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm="3">
                            <FormGroup>
                                <Label for="firstName"><Trans i18nKey={"form.field.firstName"} /></Label>
                                <Input type="text" name="firstName" id="firstName"
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName} />
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label for="lastName"><Trans i18nKey={"form.field.lastName"} /></Label>
                                <Input type="text" name="lastName" id="lastName"
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName} />
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label for="dateBirth"><Trans i18nKey={"form.field.dateOfBirth"} /></Label>
                                <Input type="date"
                                    name="dateBirth"
                                    id="dateBirth"
                                    onChange={e => setDateBirth(e.target.value)}
                                    value={dateBirth} />
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label for="gender"><Trans i18nKey={"form.field.gender"} /></Label>
                                <SelectGender
                                    name="gender"
                                    id="gender"
                                    onChange={e => setGender(e.target.value)}
                                    value={gender} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="6">
                            <FormGroup>
                                <Label for="email"><Trans i18nKey={"form.field.email"} /></Label>
                                <Input type="email" name="email" id="email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    maxLength={EMAIL_MAXLENGTH} />
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label for="password"><Trans i18nKey={"form.field.password"} /></Label>
                                <Input type="password" name="password" id="password"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    maxLength={PASSWORD_MAXLENGTH}
                                    minLength={PASSWORD_MINLENGTH} 
                                    disabled={id != null}/>
                            </FormGroup>
                        </Col>
                        <Col sm="3">
                            <FormGroup>
                                <Label for="passwordConfirmation"><Trans i18nKey={"form.field.passwordConfirmation"} /></Label>
                                <Input type="password" name="passwordConfirmation" id="passwordConfirmation"
                                    onChange={e => setPasswordConfirmation(e.target.value)}
                                    value={passwordConfirmation}
                                    maxLength={PASSWORD_MAXLENGTH}
                                    minLength={PASSWORD_MINLENGTH}
                                    disabled={id != null} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col sm="6" className="pl-0 pr-0">
                            { /** Group */}
                            <AddRemoveGroup setGroups={setGroups} added={groups} />
                        </Col>
                        <Col sm="6" className="pl-0 pr-0">
                            { /** Roles */}
                            <AddRemoveRole setRoles={setRoles} added={roles} />
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