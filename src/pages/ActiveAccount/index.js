import React from 'react';
import { withRouter } from 'react-router-dom';

import { BackendErrorNotification, NotificationType } from '../../core/components/notification';
import BaseTemplate from '../../core/template/baseTemplate';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';
import api from '../../services/api';
import { urlActiveAccount } from '../../services/endpoint';
import BaseEntity from '../../core/components/baseEntity';

class ActiveAccount extends BaseEntity {
    initialState = {
        uuid: null,
        displayMessage: true
    };
    state = this.initState(this.initialState);

    isValid(data) {
        if (data.uuid == null || data.uuid === '') {
            const message = "UUID não informado.";
            Notification(message, NotificationType.WARN);
            return false;
        }

        return true;
    }

    getData = () => {
        return {
            uuid: this.state.uuid
        };
    }

    handleLoad = () => {
        // Get UUID
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const uuidValue = params.get('uuid');
        let data = this.getData();
        data.uuid = uuidValue;

        if (this.isValid(data)) {
            this.showLoading(true);

            api.post(urlActiveAccount, data)
                .then(() => {
                    this.setState({
                        displayMessage: true
                    });
                })
                .catch(error => {
                    BackendErrorNotification(error);
                })
                .finally(() => {
                    this.showLoading(false);
                });
        }
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }

    render() {
        return (
            <BaseTemplate loading={this.getStatusLoading()}>
                {this.state.displayMessage ? <h2>{i18next.t('activeAccount.successfullyActivated')}</h2>: null}
            </BaseTemplate>
        );
    }
}

export default withRouter(withTranslation()(ActiveAccount));