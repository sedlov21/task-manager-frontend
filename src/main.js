import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import App from './App.js'

// Инициализация Telegram Web App
if (window.Telegram && window.Telegram.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
  window.Telegram.WebApp.setHeaderColor('#0088cc');
  window.Telegram.WebApp.setBackgroundColor('#f9fafb');
}

createApp(App).mount('#root')
