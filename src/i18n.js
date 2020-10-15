import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import Backend from 'i18next-http-backend';
import Cookies from 'js-cookie';
 
i18n
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)  
  // connect with React
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
 
    lng: Cookies.get("locale") || 'en', // Idioma inicial usado.
    fallbackLng: 'en', // o idioma que será usado caso algumas traduções não sejam definidas.
     
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
 
export default i18n;