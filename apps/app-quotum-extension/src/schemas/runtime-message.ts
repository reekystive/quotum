import { z } from 'zod';

export const systemThemeChangeMessageSchema = z.object({
  type: z.literal('system-theme-change'),
  theme: z.enum(['light', 'dark']),
});

export type SystemThemeChangeMessage = z.infer<typeof systemThemeChangeMessageSchema>;

export const placeholderMessageSchema = z.object({
  type: z.literal('placeholder'),
});

export type PlaceholderMessage = z.infer<typeof placeholderMessageSchema>;

export const runtimeMessageSchema = z.discriminatedUnion('type', [
  systemThemeChangeMessageSchema,
  placeholderMessageSchema,
]);

export type RuntimeMessage = z.infer<typeof runtimeMessageSchema>;
