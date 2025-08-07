import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './content-global.css';
import tailwindText from './content-shadow-root.css?inline';
import { NonShadowRoot } from './non-shadow-root/non-shadow-root.js';
import { App } from './shadow-root/app.js';

export const injectContentScriptsForUi = () => {
  console.log('[Quotum] injecting content scripts for ui');

  // shadow root
  const host = document.createElement('div');
  host.id = 'quotum-extension-content-script';
  document.body.appendChild(host);

  const shadowRoot = host.attachShadow({ mode: 'closed' });

  const tailwindSheet = new CSSStyleSheet();
  tailwindSheet.replaceSync(tailwindText);

  shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, tailwindSheet];

  const mountNode = document.createElement('div');
  mountNode.id = 'quotum-extension-content-script-mount-node';
  shadowRoot.appendChild(mountNode);

  createRoot(mountNode).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // non shadow root
  const nonShadowRoot = document.createElement('div');
  nonShadowRoot.id = 'quotum-extension-content-script-non-shadow-root';
  document.body.appendChild(nonShadowRoot);

  createRoot(nonShadowRoot).render(
    <StrictMode>
      <NonShadowRoot />
    </StrictMode>
  );
};
