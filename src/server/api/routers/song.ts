import { type Song } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createPlatformLinkArray } from "~/utils/songlink";
import { type SongLinkResponse } from "~/utils/types";

export const songRouter = createTRPCRouter({
  getSongByLink: publicProcedure
    .input(z.object({ link: z.string() }))
    .query(async ({ ctx, input }): Promise<Song> => {
      const platformLink = await ctx.prisma.platformLink.findUnique({
        where: { link: input.link },
        include: { song: true },
      });

      if (platformLink) {
        return platformLink.song;
      }

      const fetchedSong = await fetch(
        "https://api.song.link/v1-alpha.1/links?" +
          new URLSearchParams({
            url: input.link,
            userCountry: "US",
            songIfSingle: "true",
          }).toString()
      );

      if (!fetchedSong.ok) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const song = (await fetchedSong.json()) as SongLinkResponse;
      const firstEntity = Object.values(song.entitiesByUniqueId)[0];
      if (!firstEntity) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No entity found",
        });
      }

      const platformLinkArray = createPlatformLinkArray(song.linksByPlatform);
      const existingPlatformLink = await ctx.prisma.platformLink.findFirst({
        where: {
          link: { in: platformLinkArray.map((link) => link.url) },
        },
        include: { song: true },
      });

      if (existingPlatformLink) {
        const existingSong = existingPlatformLink.song;

        // create platform links if they don't already exist
        await ctx.prisma.platformLink.createMany({
          data: platformLinkArray.map((link) => ({
            platform: link.platform,
            link: link.url,
            songId: existingSong.uuid,
          })),
          skipDuplicates: true,
        });

        return existingSong;
      }

      const newSong = await ctx.prisma.song.create({
        data: {
          title: firstEntity.title || "Unknown",
          artist: firstEntity.artistName || "Unknown",
          coverArt: firstEntity.thumbnailUrl,
        },
      });

      await ctx.prisma.platformLink.createMany({
        data: platformLinkArray.map((link) => ({
          platform: link.platform,
          link: link.url,
          songId: newSong.uuid,
        })),
      });

      return newSong;
    }),
});
