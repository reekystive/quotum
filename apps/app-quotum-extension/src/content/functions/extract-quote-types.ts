import { z } from 'zod';

export const ExtractedQuoteDataSchema = z.union([
  z.object({
    status: z.literal('success'),
    selectedText: z.string().min(1),
    pageTitle: z.string().min(1),
    url: z.string().url(),
    textStart: z.string().min(1),
    textEnd: z.string().optional(),
    prefix: z.string().optional(),
    suffix: z.string().optional(),
  }),
  z.object({
    status: z.literal('error'),
    message: z.string().min(1),
  }),
]);

export type ExtractedQuoteData = z.infer<typeof ExtractedQuoteDataSchema>;
