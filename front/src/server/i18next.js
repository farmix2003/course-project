import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            translation: {
                home: 'Home',
                createCollection: 'Create Collection',
                colletionItems: 'Collection Items',
                addNew: 'Add New',
                editCollection: 'Edit Collection',
                saveChanges: 'Save',
                cancelEdit: 'Cancel',
                addAdmin: 'Add Admin',
                removeAdmin: 'Remove Admin',
                addNewItem: 'Add New Item',
                add: 'Add',
                editCollectionItem: 'Edit Collection Item',
                login: 'Login',
                register: 'Register',
                loginMsg: 'You do not have an account?',
                registerMsg: 'You have an account?'
            }
        },
        uz: {
            translation: {
                home: 'Asosiy',
                createCollection: 'Kolleksiya yaratish',
                colletionItems: 'Kolleksiya mavzulari',
                addNew: 'Yangi qo\'shish',
                editCollection: 'Koleksiyani tahrirlash',
                saveChanges: 'Saqlash',
                cancelEdit: 'Bekor qilish',
                addAdmin: 'Admin qo\'shish',
                removeAdmin: 'Adminni o\'chirish',
                addNewItem: 'Yangi mavzu qo\'shish',
                add: 'Qo\'shish',
                editCollectionItem: 'Koleksiyani mavzusini tahrirlash',
                login: 'Kirish',
                register: 'Ro\'yxatdan o\'tish',
                loginMsg: 'Sizda akkount yo\'qmi?',
                registerMsg: 'Sizda akkount mavjudmi?'
            }
        },
    }
});

export default i18next;
