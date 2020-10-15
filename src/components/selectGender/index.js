import React, { useState } from 'react';
import { Input } from 'reactstrap';
import { useTranslation } from 'react-i18next';

export default function SelectGender(props) {
    const { t } = useTranslation();

    return (
        <Input type="select" {...props}>
            <option value="">{t("form.label.choose")}</option>
            <option value="MALE">{t("form.field.male")}</option>
            <option value="FEMALE">{t("form.field.female")}</option>
        </Input>
    );
}