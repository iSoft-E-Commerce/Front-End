import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Головна: 'Home',
        profile: 'Profile',
        basket: 'Basket',
        wishlist: 'Wishlist',
        'user-agreement': 'User-Agreement',
        delivery: 'Delivery',
        'exchange-return': 'Exchange return',
        contacts: 'Contacts',
        compare: 'Compare',
      },
    },
    ua: {
      translation: {
        Головна: 'Головна',
        profile: 'Профіль',
        basket: 'Кошик',
        wishlist: 'Список бажань',
        'user-agreement': 'Угода користувача',
        delivery: 'Доставка & оплата',
        'exchange-return': 'Обмін & Повернення',
        contacts: 'Контакти',
        compare: 'Порівняння',
      },
    },
  },
  lng: 'ua',
  fallbackLng: 'ua',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
