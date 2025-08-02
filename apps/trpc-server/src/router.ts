import { z } from 'zod';
import { db } from './database.js';
import { getResendClient } from './services/resend.js';
import { publicProcedure, router } from './trpc.js';

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),

  userById: publicProcedure.input(z.string().min(1)).query(async (opts) => {
    const { input } = opts;
    const user = await db.user.findById(input);
    return user;
  }),

  userCreate: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async (opts) => {
    const { input } = opts;
    const user = await db.user.create(input);
    return user;
  }),

  userDelete: publicProcedure.input(z.object({ id: z.string().min(1) })).mutation(async (opts) => {
    const { input } = opts;
    await db.user.delete(input.id);
  }),

  sendEmail: publicProcedure
    .input(z.object({ to: z.string().min(1), subject: z.string().min(1), html: z.string().min(1) }))
    .mutation(async (opts) => {
      const { input } = opts;
      const resend = await getResendClient();
      await resend.emails.send({
        from: 'noreply@subby.day',
        to: input.to,
        subject: input.subject,
        html: input.html,
      });
    }),
});

export type AppRouter = typeof appRouter;
