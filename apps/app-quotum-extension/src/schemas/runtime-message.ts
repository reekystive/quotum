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

export const offscreenReadyMessageSchema = z.object({
  type: z.literal('offscreen-ready'),
});

export type OffscreenReadyMessage = z.infer<typeof offscreenReadyMessageSchema>;

export const runtimeMessageSchema = z.discriminatedUnion('type', [
  systemThemeChangeMessageSchema,
  injectionCompleteMessageSchema,
  offscreenReadyMessageSchema,
]);

export type RuntimeMessage = z.infer<typeof runtimeMessageSchema>;
