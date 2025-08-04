import { z } from 'zod';
import { db } from './database.js';
import { publicProcedure, router } from './trpc.js';

export const appRouter = router({
  quoteList: publicProcedure.query(async () => {
    const quotes = await db.quote.findMany();
    return quotes;
  }),

  quoteById: publicProcedure.input(z.string().min(1)).query(async (opts) => {
    const { input } = opts;
    const quote = await db.quote.findById(input);
    return quote;
  }),

  quoteCreate: publicProcedure
    .input(
      z.object({
        content: z.string().min(1),
        title: z.string().min(1),
        url: z.string().url(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const quote = await db.quote.create(input);
      return quote;
    }),
});

export type AppRouter = typeof appRouter;

export const createCaller = appRouter.createCaller;
