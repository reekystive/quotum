import { defineManifest } from '@crxjs/vite-plugin';
import { extensionVersion, extensionVersionName } from './versioning.js';

export default defineManifest({
  manifest_version: 3,
  name: 'Quotum',
  version: extensionVersion,
  description: 'Instantly save and share text quotes from any webpage',
  version_name: extensionVersionName,
  icons: {
    48: 'icon-dark.png',
  },
  action: {
    default_icon: {
      48: 'icon-dark.png',
    },
    default_popup: 'src/app/ui-popup/index.html',
  },
  permissions: ['contextMenus', 'scripting', 'activeTab', 'storage', 'offscreen'],
  host_permissions: ['https://quotum.me/*', 'https://dev.quotum.me/*', 'http://localhost:3000/*'],
  options_ui: {
    open_in_tab: true,
    page: 'src/app/ui-options/index.html',
  },
  background: {
    service_worker: 'src/app/background/index.ts',
    type: 'module',
  },
  web_accessible_resources: [
    {
      resources: ['src/app/offscreen/index.html'],
      matches: ['<all_urls>'],
    },
  ],
});
