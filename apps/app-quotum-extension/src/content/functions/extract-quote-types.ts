import { z } from 'zod';

export const ExtractedQuoteDataSchema = z.union([
  z.object({
    status: z.literal('success'),
    selectedText: z.string(),
    pageTitle: z.string(),
    url: z.string().url(),
    textStart: z.string(),
    textEnd: z.string().optional(),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
  }),
  z.object({
    status: z.literal('error'),
    message: z.string(),
  }),
]);

export type ExtractedQuoteData = z.infer<typeof ExtractedQuoteDataSchema>;
