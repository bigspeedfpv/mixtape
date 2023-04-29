import * as z from "zod"
import { Platform } from "@prisma/client"
import { CompleteSong, RelatedSongSchema } from "./index"

export const PlatformLinkSchema = z.object({
  uuid: z.string(),
  platform: z.nativeEnum(Platform),
  link: z.string(),
  songId: z.string(),
})

export interface CompletePlatformLink extends z.infer<typeof PlatformLinkSchema> {
  song: CompleteSong
}

/**
 * RelatedPlatformLinkSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPlatformLinkSchema: z.ZodSchema<CompletePlatformLink> = z.lazy(() => PlatformLinkSchema.extend({
  song: RelatedSongSchema,
}))
