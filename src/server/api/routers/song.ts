import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type SongLinkResponse } from "~/utils/types";

export const songRouter = createTRPCRouter({
  getSongByLink: publicProcedure
    .input(z.object({ link: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const platformLink = await ctx.prisma.platformLink.findUnique({
        where: { link: input.link },
        include: { song: true },
      });

      if (platformLink) {
        return platformLink.song;
      }

      const fetchedSong = await fetch(
        "https://api.song.link/v1-alpha.1/links" +
          new URLSearchParams({ url: input.link }).toString()
      );

      if (!fetchedSong.ok) {
        return new TRPCError({ code: "NOT_FOUND" });
      }

      const song = (await fetchedSong.json()) as SongLinkResponse;

      // i hate the way this api works but i love songlink
      const firstPlatform = Object.keys(song.entitiesByUniqueId)[0];

      if (!firstPlatform) {
        return new TRPCError({ code: "NOT_FOUND" });
      }

      // lord forgive me
      const songLinkArray = Object.values(song.linksByPlatform).map(
        (link) => link.url
      );

      const existingPlatformLink = await ctx.prisma.platformLink.findFirst({
        where: {
          link: { in: songLinkArray },
        },
        include: { song: true },
      });

      if (existingPlatformLink) {
        const song = existingPlatformLink.song;

        return song;
      }
    }),
});
