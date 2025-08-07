import { z } from 'zod';

export const systemThemeChangeMessageSchema = z.object({
  type: z.literal('system-theme-change'),
  theme: z.enum(['light', 'dark']),
});

export type SystemThemeChangeMessage = z.infer<typeof systemThemeChangeMessageSchema>;

export const injectionCompleteMessageSchema = z.object({
  type: z.literal('injection-complete'),
});

export type InjectionCompleteMessage = z.infer<typeof injectionCompleteMessageSchema>;

export const runtimeMessageSchema = z.discriminatedUnion('type', [
  systemThemeChangeMessageSchema,
  injectionCompleteMessageSchema,
]);

export type RuntimeMessage = z.infer<typeof runtimeMessageSchema>;
