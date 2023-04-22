import { type Platform } from "@prisma/client";

export type SongLinkResponse = {
  entityUniqueId: string;
  userCountry: string;
  pageUrl: string;
  linksByPlatform: Record<Platform, SonglinkPlatformLink>;
  entitiesByUniqueId: Record<string, SonglinkEntity>;
};

export type SonglinkPlatformLink = {
  country: string;
  entityUniqueId: string;
  url: string;
  nativeAppUriMobile?: string;
  nativeAppUriDesktop?: string;
};

export type SonglinkEntity = {
  id: string;
  type: "song" | "album";
  title?: string;
  artistName?: string;
  thumbnailUrl?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  apiProvider: Platform;
  platforms: Platform[];
};
