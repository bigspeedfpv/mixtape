import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const songRouter = createTRPCRouter({
  getSongByLink: publicProcedure
    .input(z.object({ link: z.string() }))
    .query(async ({ ctx, input }) => {
      const platformLink = await ctx.prisma.platformLink.findUnique({
        where: { link: input.link },
        include: { song: true },
      });

      if (!platformLink) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return platformLink.song;
    })
});