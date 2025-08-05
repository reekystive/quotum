import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './content.css';
import tailwindText from './shadow-root.css?inline';
import { App } from './views/app.js';

console.log('[CRXJS] Hello world from content script!');

const host = document.createElement('div');
host.id = 'quotum-extension-content-script';
document.body.appendChild(host);

const shadowRoot = host.attachShadow({ mode: 'open' });

const sheet = new CSSStyleSheet();
sheet.replaceSync(tailwindText);
shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];

const mountNode = document.createElement('div');
mountNode.id = 'quotum-extension-content-script-mount-node';
shadowRoot.appendChild(mountNode);

createRoot(mountNode).render(
  <StrictMode>
    <App />
  </StrictMode>
);
