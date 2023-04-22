export type SongLinkResponse = {
  entityUniqueId: string;
  userCountry: string;
  pageUrl: string;
  linksByPlatform: Record<string, Platform>;
  entitiesByUniqueId: Record<string, Entity>;
};

type Platform = {
  entityUniqueId: string;
  url: string;
  nativeAppUriMobile: string | null;
  nativeAppUriDesktop: string | null;
};

type Entity = {
  id: string;
  type: "song" | "album";
  title: string | null;
  artistName: string | null;
  thumbnailUrl: string | null;
  thumbnailWidth: number | null;
  thumbnailHeight: number | null;
  apiProvider: APIProvider;
  platforms: Store[];
};

type Store =
  | "spotify"
  | "itunes"
  | "appleMusic"
  | "youtube"
  | "youtubeMusic"
  | "google"
  | "googleStore"
  | "pandora"
  | "deezer"
  | "tidal"
  | "amazonStore"
  | "amazonMusic"
  | "soundcloud"
  | "napster"
  | "yandex"
  | "spinrilla"
  | "audius"
  | "audiomack"
  | "anghami"
  | "boomplay";

type APIProvider =
  | "spotify"
  | "itunes"
  | "youtube"
  | "google"
  | "pandora"
  | "deezer"
  | "tidal"
  | "amazon"
  | "soundcloud"
  | "napster"
  | "yandex"
  | "spinrilla"
  | "audius"
  | "audiomack"
  | "anghami"
  | "boomplay";
