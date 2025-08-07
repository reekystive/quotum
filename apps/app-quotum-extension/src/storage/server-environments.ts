import browser from 'webextension-polyfill';
import z from 'zod';

export const serverEnvironmentSchema = z.object({
  value: z.string(),
  label: z.string(),
  removable: z.boolean().optional(),
});

export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;

export const DEFAULT_SERVER_ENVIRONMENTS = [
  {
    value: 'https://quotum.me',
    label: 'Production',
    removable: false,
  },
  {
    value: 'https://dev.quotum.me',
    label: 'Development',
    removable: false,
  },
  {
    value: 'http://localhost:3000',
    label: 'Local',
    removable: false,
  },
] as const satisfies ServerEnvironment[];

export const DEFAULT_SERVER_ENVIRONMENT = DEFAULT_SERVER_ENVIRONMENTS[1];

export const getSelectedServerEnvironmentInStorage = async (): Promise<ServerEnvironment> => {
  const options = await browser.storage.local.get('selectedServerEnvironment');
  const parsed = serverEnvironmentSchema.safeParse(options.selectedServerEnvironment);
  if (!parsed.success) {
    console.warn('Invalid selected server environment', parsed.error);
    console.warn('Resetting selected server environment to default');
    await browser.storage.local.set({ selectedServerEnvironment: DEFAULT_SERVER_ENVIRONMENT });
    return DEFAULT_SERVER_ENVIRONMENT;
  }
  return parsed.data;
};

export const setSelectedServerEnvironmentInStorage = async (value: string) => {
  const customEnvironments = await getCustomServerEnvironmentsInStorage();
  const allEnvironments = [...DEFAULT_SERVER_ENVIRONMENTS, ...customEnvironments];
  const selected = allEnvironments.find((e) => e.value === value);
  if (!selected) {
    console.error('[Quotum] Requested server environment not found, doing nothing', value);
    return;
  }
  await browser.storage.local.set({ selectedServerEnvironment: selected });
};

export const getCustomServerEnvironmentsInStorage = async (): Promise<ServerEnvironment[]> => {
  console.log('[Quotum] Getting custom server environments');
  const options = await browser.storage.local.get('serverEnvironments');
  const parsed = z.array(serverEnvironmentSchema).safeParse(options.serverEnvironments);
  if (!parsed.success) {
    console.warn('Invalid server environments', parsed.error);
    console.warn('Resetting server environments to empty array');
    await browser.storage.local.set({ serverEnvironments: [] });
    return [];
  }
  console.log('[Quotum] Custom server environments', parsed.data);
  return parsed.data;
};

export const removeCustomServerEnvironmentInStorage = async (value: string) => {
  console.log('[Quotum] Removing custom server environment', value);
  const environments = await getCustomServerEnvironmentsInStorage();
  const filtered = environments.filter((option) => option.value !== value);
  await browser.storage.local.set({ serverEnvironments: filtered });
};

export const addCustomServerEnvironmentInStorage = async (value: string, label: string) => {
  console.log('[Quotum] Adding custom server environment', value, label);
  const customEnvironments = await getCustomServerEnvironmentsInStorage();
  const allEnvironments = [...DEFAULT_SERVER_ENVIRONMENTS, ...customEnvironments];
  const existing = allEnvironments.find((e) => e.value === value);
  if (existing) {
    console.warn('[Quotum] Custom server environment already exists', value);
    return;
  }
  const newEnvironment = { value, label, removable: true };
  await browser.storage.local.set({ serverEnvironments: [...customEnvironments, newEnvironment] });
  console.log('[Quotum] Added custom server environment', newEnvironment);
};
