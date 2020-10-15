import React from 'react';
import i18next from 'i18next';
import { withTranslation } from 'react-i18next';

class SelectGender extends React.Component {
    render() {
        return (
            <select 
                value={this.props.value}
                className={this.props.className}
                onChange={this.props.onChange}>
                <option value="">{i18next.t("field.gender")}</option>
                <option value="MALE">{i18next.t("field.male")}</option>
                <option value="FEMALE">{i18next.t("field.female")}</option>
            </select>
        );
    }
}

export default withTranslation()(SelectGender);