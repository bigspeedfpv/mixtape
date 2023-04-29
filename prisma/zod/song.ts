import * as z from "zod"
import { CompletePlatformLink, RelatedPlatformLinkSchema, CompletePlaylist, RelatedPlaylistSchema } from "./index"

export const SongSchema = z.object({
  uuid: z.string(),
  title: z.string(),
  artist: z.string(),
  coverArt: z.string().nullish(),
})

export interface CompleteSong extends z.infer<typeof SongSchema> {
  platformLinks: CompletePlatformLink[]
  playlists: CompletePlaylist[]
}

/**
 * RelatedSongSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSongSchema: z.ZodSchema<CompleteSong> = z.lazy(() => SongSchema.extend({
  platformLinks: RelatedPlatformLinkSchema.array(),
  playlists: RelatedPlaylistSchema.array(),
}))
