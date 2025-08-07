import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from './package.json' with { type: 'json' };

export default defineManifest({
  manifest_version: 3,
  name: 'Quotum',
  version: packageJson.version,
  icons: {
    48: 'icon-dark.png',
  },
  action: {
    default_icon: {
      48: 'icon-dark.png',
    },
    default_popup: 'src/app/ui-popup/index.html',
  },
  permissions: ['contextMenus', 'scripting', 'activeTab', 'storage'],
  content_scripts: [
    {
      js: ['src/app/content/injected/index.ts', 'src/app/content/main.tsx'],
      matches: ['https://*/*'],
    },
  ],
  options_ui: {
    open_in_tab: true,
    page: 'src/app/ui-options/index.html',
  },
  background: {
    service_worker: 'src/app/background/index.ts',
    type: 'module',
  },
});
