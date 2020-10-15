import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';
import { urlResetPassword } from '../../services/endpoint';
import { BackendErrorNotification, FrontendNotification, NotificationType } from '../../core/components/notification';
import BaseTemplate from '../../core/template/baseTemplate';
import Input from '../../core/components/form/input';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import Button from '../../core/components/form/button';
import BaseEntity from '../../core/components/baseEntity';
import { isValidPassword, isValidPasswordConfirmation } from '../../core/components/util';
import { passwordMaxLength, passwordMinLength } from '../../config/field';
import Form from '../../core/components/form/form';

class ResetPassword extends BaseEntity {
    initialState = {
        uuid: '',
        password: '',
        passwordConfirmation: ''
    }
    state = this.initState(this.initialState);

    handleSubmit = e => {
        e.preventDefault();

        // Get UUID
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const uuidValue = params.get('uuid');

        let data = this.getData();
        data.uuid = uuidValue;

        if (this.isValid(data)) {
            this.showLoading(true);

            api.post(urlResetPassword, data)
                .then(res => {
                    this.handleFormReset();
                    const message = i18next.t("resetPassword.passwordUpdated");
                    FrontendNotification(message, NotificationType.SUCCESS);
                    this.props.history.push("/");
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
        let message = null;

        if (!data.password) {
            message = i18next.t('message.field.passwordRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        /*if (isValidPassword(data.password)) {
            const password = {
                minimumSize: passwordMinLength
            };
            message = i18next.t('message.field.passwordMinimunSize', { password });
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }*/

        if (!data.passwordConfirmation) {
            message = i18next.t('message.field.passwordConfirmationRequired');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }

        /*if (!isValidPasswordConfirmation(data.password, data.passwordConfirmation)) {
            message = i18next.t('message.field.invalidPasswordConfirmation');
            FrontendNotification(message, NotificationType.WARNING);
            return false;
        }*/

        return true;
    }

    getData = () => {
        return {
            uuid: this.state.uuid,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        };
    }

    handleFormReset = () => {
        this.setState(this.initialState);
    }

    render() {
        return (
            <BaseTemplate loading={this.getStatusLoading()}>
                <h5 className="text-center">{i18next.t("resetPassword.title")}</h5>
                <p className="text-center">{i18next.t("resetPassword.instruction")}</p>

                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Input.Password className="form-control"
                                    placeholder={i18next.t("field.newPassword")}
                                    onChange={e => this.setState({ password: e.target.value })}
                                    value={this.state.password} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Input.Password
                                    className="form-control"
                                    placeholder={i18next.t("field.passwordConfirmation")}
                                    onChange={e => this.setState({ passwordConfirmation: e.target.value })}
                                    value={this.state.passwordConfirmation}
                                    maxLength={passwordMaxLength} />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Button className="btn btn-success btn-block">{i18next.t("button.update")}</Button>
                            </div>
                        </div>
                    </div>

                    <hr />
                    <center>
                        <Link to="/">{i18next.t("button.login")}</Link>
                    </center>
                </Form>
            </BaseTemplate>
        );
    }
}

export default withRouter(withTranslation()(ResetPassword));