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
    default_popup: 'src/popup/index.html',
  },
  permissions: ['sidePanel', 'contentSettings', 'contextMenus', 'scripting', 'activeTab'],
  content_scripts: [
    {
      js: ['src/content/main.tsx', 'src/content/injected/index.ts'],
      matches: ['https://*/*'],
    },
  ],
  side_panel: {
    default_path: 'src/side-panel/index.html',
  },
  options_ui: {
    open_in_tab: true,
    page: 'src/options-ui/index.html',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
});
