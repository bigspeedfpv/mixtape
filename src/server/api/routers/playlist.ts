import { SongSchema } from "prisma/zod";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const playlistRouter = createTRPCRouter({
  savePlaylist: publicProcedure
    .input(z.array(SongSchema))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const uuids = input.map((song) => ({ uuid: song.uuid }));

      const playlist = await prisma.playlist.create({
        data: {
          name: "My Playlist",
          songs: {
            connect: uuids,
          },
        },
      });

      console.log(JSON.stringify(playlist, null, 2));
    }),
});
