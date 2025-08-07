import { getSelectedServerEnvironmentInStorage } from './storage/server-environments.js';

export const getServerBaseUrl = async () => {
  const selectedServerEnvironment = await getSelectedServerEnvironmentInStorage();
  return selectedServerEnvironment.value;
};

export const getTrpcEndpointUrl = async () => {
  const serverBaseUrl = await getServerBaseUrl();
  return `${serverBaseUrl}/api/trpc`;
};
