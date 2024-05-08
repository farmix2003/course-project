import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                welcome: 'Welcome'
            }
        },
        uz: {
            translation: {
                welcome: 'Hush Kelibsiz'
            }
        },
    }
})
export default i18next