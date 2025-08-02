import { getCloudflareContext } from '@opennextjs/cloudflare';
import { Resend } from 'resend';

export const getResendClient = async () => {
  const cloudflareContext = await getCloudflareContext({ async: true });
  const RESEND_API_KEY = cloudflareContext.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(RESEND_API_KEY);
};
