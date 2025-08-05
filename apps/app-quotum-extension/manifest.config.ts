import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from './package.json' with { type: 'json' };

export default defineManifest({
  manifest_version: 3,
  name: 'Quotum',
  version: packageJson.version,
  icons: {
    48: 'public/logo.png',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
    default_popup: 'src/popup/index.html',
  },
  permissions: ['sidePanel', 'contentSettings'],
  content_scripts: [
    {
      js: ['src/content/main.tsx'],
      matches: ['https://*/*'],
    },
  ],
  side_panel: {
    default_path: 'src/side-panel/index.html',
  },
  options_ui: {
    open_in_tab: false,
    page: 'src/options-ui/index.html',
  },
});
