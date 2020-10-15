import React from 'react';

import ImageBrazilFlat from './assets/brazil.png';
import ImageUnitedStatesFlat from './assets/united-states.png';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";

/**
 * Componente responsável por mudar o idioma da aplicação.
 * @author André Leitão 
 */
export default function LanguageChange() {
    const { t } = useTranslation();

    // Realiza a alteração do idioma e o guarda em Cookie
    // e assim será mantida o idioma escolhido pelo usuário.
    function change(languageCode) {
        i18next.changeLanguage(languageCode);
        Cookies.set("locale", languageCode);
    }

    return (
        <>
            <h6 className="text-center">{t("component.language.title")}</h6>
            <div className="d-flex">
                <ul className="list-inline mx-auto justify-content-center">
                    <li className="list-inline-item">
                        <a href="/" onClick={e => { e.preventDefault(); change("pt-br"); }}>
                            <img src={ImageBrazilFlat} alt={t("component.language.portuguese")} title={t("component.language.portuguese")} />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/" onClick={e => { e.preventDefault(); change("en"); }}>
                            <img src={ImageUnitedStatesFlat} alt={t("component.language.english")} title={t("component.language.english")} />
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}