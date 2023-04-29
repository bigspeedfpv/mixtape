import { createTRPCRouter } from "~/server/api/trpc";
import { songRouter } from "~/server/api/routers/song";
import { playlistRouter } from "./routers/playlist";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  playlist: playlistRouter,
  song: songRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
