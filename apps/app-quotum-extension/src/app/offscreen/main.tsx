import { listenSystemThemeChange } from './utils/listen-system-theme-change.js';

listenSystemThemeChange();

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const main = document.createElement('main');
main.textContent = 'Hello, world!';
root.appendChild(main);
