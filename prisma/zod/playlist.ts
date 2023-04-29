import * as z from "zod"
import { CompleteSong, RelatedSongSchema } from "./index"

export const PlaylistSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  accessedAt: z.date(),
})

export interface CompletePlaylist extends z.infer<typeof PlaylistSchema> {
  songs: CompleteSong[]
}

/**
 * RelatedPlaylistSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlaylistSchema: z.ZodSchema<CompletePlaylist> = z.lazy(() => PlaylistSchema.extend({
  songs: RelatedSongSchema.array(),
}))
