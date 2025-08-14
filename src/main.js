import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import App from './App.js'

// Инициализация Telegram Web App
const initTelegramApp = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    try {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.setHeaderColor('#0088cc');
      window.Telegram.WebApp.setBackgroundColor('#f9fafb');
      console.log('Telegram Web App initialized successfully');
    } catch (error) {
      console.error('Error initializing Telegram Web App:', error);
    }
  } else {
    console.warn('Telegram Web App not available - running in browser mode');
  }
};

// Инициализируем приложение
const app = createApp(App);

// Добавляем глобальные свойства
app.config.globalProperties.$telegram = window.Telegram?.WebApp || null;

// Монтируем приложение
app.mount('#root');

// Инициализируем Telegram после монтирования
initTelegramApp();
