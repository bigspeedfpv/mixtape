import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getSong: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, input }) => {
      const song = await ctx.prisma.song.findUnique({
        where: { uuid: input.uuid },
      });

      if (!song) {
        throw new TRPCError({ message: "Song not found", code: "NOT_FOUND" });
      }

      return song;
    }),
});
