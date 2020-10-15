import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { isValidEmail } from '../../core/components/util';
import { URL_AUTH } from '../../services/urlNoPrivate';
import { login, getKeepMeConnected, getEmail, storeEmail, storeKeepMeConnected, resetKeepMeConnected } from '../../storage/auth';
import api from '../../services/api';

import { useTranslation } from 'react-i18next';

import { BackendErrorNotification, FrontendNotification, NotificationType } from '../../core/components/notification';
import BaseTemplate from '../../core/template/baseTemplate';
import HttpStatus from '../../core/net/httpStatus';
import LanguageChange from '../../core/components/languageChange';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import './style.scss';
import { MAX_EMAIL_LENGTH, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../constants/field';

/**
 * Tela de autenticação da aplicação.
 * @author André Leitão
 */
function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepMeConnected, setKeepMeConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const history = useHistory();

    // Submete o formulário
    function handleSubmit(e) {
        e.preventDefault();

        if (isValid(getData())) {
            setLoading(true);
            console.log(URL_AUTH);
            api.post(URL_AUTH, getData())
                .then(res => {
                    if (res.status === HttpStatus.OK) {
                        let token = res.data.token;
                        login(token);

                        if (keepMeConnected) {
                            // Guarda os dados no LocalStorage
                            storeKeepMeConnected(true);
                            storeEmail(getData().email);
                        } else {
                            resetKeepMeConnected();
                        }
                       
                        history.push("/main");
                    }
                })
                .catch(error => {
                    BackendErrorNotification(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    // Dados que serão enviados.
    function getData() {
        return {
            email: email,
            password: password
        };
    }

    // Responsável por validar os campos do formulário.
    function isValid(data) {
        let message = null;

        if (!data.email) {
            message = t('form.field.message.emailRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        } else if (!isValidEmail(data.email)) {
            message = t('form.field.message.invalidEmail');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        } else if (!data.password) {
            message = t('form.field.message.passwordRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        } else if (data.password.length < MIN_PASSWORD_LENGTH) {
            message = t('form.field.message.minPasswordLength', { length: MIN_PASSWORD_LENGTH });
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        return true;
    };

    // Manipula o checkbox do mantenha-me conectado.
    function handleKeepConnected() {
        let keepMeConnectedValue = true;

        if (keepMeConnected === true) {
            keepMeConnectedValue = false;
        }

        setKeepMeConnected(keepMeConnectedValue);
    }

    // Similar ao componentDidMount e componentDidUpdate.
    useEffect(() => {
        // Atualiza o titulo do documento usando a API do browser          
        if (getKeepMeConnected()) {            
            setKeepMeConnected(true); // Deixa marcado o Matenha-me conectado.
            setEmail(getEmail());
        } else {
            setKeepMeConnected(false); 
        }
    }, []);

    return (
        <BaseTemplate loading={loading}>
            <Form className="center-form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        placeholder={t("form.field.email")}
                        maxLength={MAX_EMAIL_LENGTH}
                        onChange={e => setEmail(e.target.value)}
                        value={email} />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="password"
                        placeholder={t("field.password")}
                        maxLength={MAX_PASSWORD_LENGTH}
                        onChange={e => setPassword(e.target.value)}
                        value={password} />
                </FormGroup>
                <FormGroup check>
                    <Label htmlFor="keepMeConnected" check>
                        <Input type="checkbox"
                            className="mr-1"
                            id="keepMeConnected"
                            onChange={handleKeepConnected}
                            checked={keepMeConnected} />
                        {t("signIn.keepMeConnected")}
                    </Label>
                </FormGroup>
                <Button color="primary" className="mt-3 btn-block">{t("form.button.login")}</Button>
                <hr />
                <Link to="/ForgotPassword" className="d-flex justify-content-center">{t("signIn.forgotYourPassword")}</Link>
                <Link to="/SignUp">
                    <Button color="secondary" className="btn-block mt-3">{t("form.button.createAccount")}</Button>
                </Link>
            </Form>

            {/* Componente de escolha de idioma */}
            <br />
            <LanguageChange></LanguageChange>
        </BaseTemplate>
    );
}

export default SignIn;