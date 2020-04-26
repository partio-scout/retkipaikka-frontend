import i18n from 'i18next';
import backend from 'i18next-xhr-backend';
import { initReactI18next } from "react-i18next"

i18n
    .use(backend)
    .use(initReactI18next)
    .init({
        lng: 'fi',
        fallbackLng: 'fi',
        preload: ["fi", "en", "sv", "sa"],
        backend: {
            loadPath: `${_LOCALES_PATH_}{{lng}}/{{ns}}.json`
        },
        ns: ["translations"],
        defaultNS: "translations",
        interpolation: {
            escapeValue: false
        },
        react: {
            wait: true,
            useSuspense: false
        }
    });

export default i18n;
