import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { BackendErrorNotification, FrontendNotification, NotificationType } from '../../core/components/notification';
import api from '../../services/api';
import { urlForgotPassword } from '../../services/endpoint';
import BaseTemplate from '../../core/template/baseTemplate';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import BaseEntity from '../../core/components/baseEntity';

import Input from '../../core/components/form/input';
import Button from '../../core/components/form/button';
import Form from '../../core/components/form/form';
import { isValidEmail } from '../../core/components/util';

class ForgotPassword extends BaseEntity {
    initialState = {
        email: ''
    }
    state = this.initState(this.initialState);

    handleSubmit = e => {
        e.preventDefault();

        if (this.isValid(this.getData())) {
            this.showLoading(true);

            api.post(urlForgotPassword, this.getData())
                .then(() => {
                    this.handleFormReset();
                    const message = i18next.t("forgotPassword.sentEmailMessage");
                    FrontendNotification(message, NotificationType.SUCCESS);
                })
                .catch(error => {
                    BackendErrorNotification(error);
                })
                .finally(() => {
                    this.showLoading(false);
                });
        }
    }

    isValid(data) {
        if (!data.email) {
            const message = i18next.t('message.field.emailRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        if (!isValidEmail(data.email)) {
            const message = i18next.t('message.field.invalidEmail');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        return true;
    }

    getData = () => {
        return {
            email: this.state.email
        };
    }

    handleFormReset = () => {
        this.setState(this.initialState);
    }

    render() {
        return (
            <BaseTemplate loading={this.getStatusLoading()}>
                <h5 className="text-center">{i18next.t('forgotPassword.title')}</h5>
                <p>{i18next.t('forgotPassword.instruction')}</p>

                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Input.Text className="form-control"
                                    placeholder={i18next.t("field.email")}
                                    onChange={e => this.setState({ email: e.target.value })}
                                    value={this.state.email} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Button className="btn btn-success btn-block">{i18next.t('button.send')}</Button>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <center>
                        <Link to="/">{i18next.t('button.login')}</Link>
                    </center>
                </Form>
            </BaseTemplate>
        );
    }
}

export default withRouter(withTranslation()(ForgotPassword));