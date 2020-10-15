import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

import { isValidEmail, isValidDate } from '../../core/components/util';
import api from '../../services/api';
import { urlSignUp } from '../../services/endpoint';

import { BackendErrorNotification, FrontendNotification, NotificationType } from '../../core/components/notification';
import BaseTemplate from '../../core/template/baseTemplate';
import Button from '../../core/components/form/button';
import SelectGender from '../../core/components/form/select/gender';
import BaseEntity from '../../core/components/baseEntity';
import Form from '../../core/components/form/form';
import Input from '../../core/components/form/input';
import { formatDateToDBDate, isValidPassword, isValidPasswordConfirmation } from '../../core/components/util';
import { passwordMaxLength, passwordMinLength, emailMaxLength } from '../../config/field';

class SignUp extends BaseEntity {
  initialState = {
    firstname: '',
    lastname: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    passwordConfirmation: ''
  };
  state = this.initState(this.initialState);

  callbackDateOfBirth = (date) => {       
    this.setState({ dateOfBirth: date })
  }

  handleFormReset = () => {
    this.setState(this.initialState);
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.isValid(this.getData())) {
      this.showLoading(true);

      // Converts the date to the standard yyyy-mm-dd
      let data = this.getData();
      data.dateOfBirth = formatDateToDBDate(data.dateOfBirth);      
      
      api.post(urlSignUp, data)
        .then(() => {
          this.handleFormReset();
          const message = i18next.t("signUp.accountCreated");
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
  };

  isValid = (data) => {
    let message = null;

    if (!data.firstname) {
      message = i18next.t('message.field.firstNameRequired');
      FrontendNotification(message, NotificationType.WARNING);
      return false;
    }

    if (!data.lastname) {
      message = i18next.t('message.field.lastNameRequired');
      FrontendNotification(message, NotificationType.WARNING);
      return false;
    }

    if (!data.email) {
      message = i18next.t('message.field.emailRequired');
      FrontendNotification(message, NotificationType.WARNING);
      return false;
    }

    if (!isValidEmail(data.email)) {
      message = i18next.t('message.field.invalidEmail');
      FrontendNotification(message, NotificationType.WARNING);
      return false;
    }

    if (!data.dateOfBirth) {
      message = i18next.t('message.field.dateBirthRequired');
      FrontendNotification(message, NotificationType.WARNING);
      return false;
    }

    if (!isValidDate(data.dateOfBirth)) {
      message = i18next.t('message.field.invalidDateBirth');
      FrontendNotification(message, NotificationType.WARNING);
      return false;
    }

    if (!data.gender) {
      message = i18next.t('message.field.genderRequired');
      FrontendNotification(message, NotificationType.WARNING);
      return false;
    }

    if (!data.password) {
      message = i18next.t('message.field.passwordRequired');
      FrontendNotification(message, NotificationType.WARNING);
      return false;
    }

    /*if (!isValidPassword(data.password)) {
      const password = { 
        minimumSize: passwordMinLength
      };
      message = i18next.t('message.field.passwordMinimunSize', {password});
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
  };

  getData = () => {
    return {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      dateOfBirth: this.state.dateOfBirth,
      gender: this.state.gender,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation
    };
  }

  render() {
    return (
      <BaseTemplate loading={this.getStatusLoading()}>
        <h2 className="text-center">{i18next.t("signUp.title")}</h2>
        <p className="text-center">{i18next.t("signUp.instruction")}</p>

        <Form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <Input.Text 
                  className="form-control"
                  placeholder={i18next.t("field.firstName")} 
                  onChange={e => this.setState({ firstname: e.target.value })}
                  value={this.state.firstname} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <Input.Text 
                  className="form-control"
                  placeholder={i18next.t("field.lastName")} 
                  onChange={e => this.setState({ lastname: e.target.value })}
                  value={this.state.lastname} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <Input.Text 
                  className="form-control"
                  placeholder={i18next.t("field.email")}
                  onChange={e => this.setState({ email: e.target.value })}
                  value={this.state.email} 
                  maxLength={emailMaxLength}/>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <Input.Date 
                  className="form-control"
                  placeholder={i18next.t("field.dateOfBirth")} 
                  callback={this.callbackDateOfBirth} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <SelectGender className="form-control"
                  onChange={e => this.setState({ gender: e.target.value })}
                  value={this.state.gender} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <Input.Password 
                  className="form-control" 
                  placeholder={i18next.t("field.password")}
                  maxLength={passwordMaxLength}
                  onChange={e => this.setState({ password: e.target.value })}
                  value={this.state.password} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <Input.Password 
                  className="form-control" 
                  placeholder={i18next.t("field.passwordConfirmation")}
                  maxLength={passwordMaxLength}
                  onChange={e => this.setState({ passwordConfirmation: e.target.value })}
                  value={this.state.passwordConfirmation} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <Button className="btn btn-success btn-block">{i18next.t("button.createAccount")}</Button>
              </div>
            </div>
          </div>
          <hr />
          <center className="mb-5">
            <Link to="/">{i18next.t("signUp.haveAnAccount")}</Link>
          </center>
        </Form>
      </BaseTemplate>
    );
  }
}

export default withRouter(withTranslation()(SignUp));