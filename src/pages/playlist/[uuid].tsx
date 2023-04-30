import React from "react";

import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { type Platform, PrismaClient, type Song } from "@prisma/client";
import SongList from "~/components/songlist";
import { songsAtom } from "~/atoms";
import { useSetAtom } from "jotai";
import Head from "next/head";

// TODO: fix SuperJSON so this doesn't have to be sanitized weirdly
type PlaylistPageProps = {
  name: string;
  songs: Song[];
};

const PlaylistPage: NextPage<PlaylistPageProps> = ({ name, songs }) => {
  const [platform, setPlatform] = React.useState<Platform>("spotify");

  const setSongs = useSetAtom(songsAtom);
  React.useEffect(() => setSongs(songs), [songs, setSongs]);

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Check out this playlist!" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100">
        <div className="flex w-4/5 max-w-xl items-center gap-4"></div>

        <SongList platform={platform} />

        <select onChange={(e) => setPlatform(e.target.value as Platform)}>
          {platformOptions.map((platform) => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>
      </main>
    </>
  );
};

export default PlaylistPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PlaylistPageProps> = async (
  context
) => {
  const uuid = context.params!.uuid || "";

  const client = new PrismaClient();

  const playlist = await client.playlist.findUnique({
    where: {
      uuid: uuid as string,
    },
    include: {
      songs: {
        include: {
          platformLinks: {
            select: {
              platform: true,
              link: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      name: playlist!.name,
      songs: playlist!.songs,
    },
  };
};

type PlatformOption = {
  readonly value: Platform;
  readonly label: string;
};

const platformOptions: Readonly<PlatformOption[]> = [
  { value: "spotify", label: "Spotify" },
  { value: "itunes", label: "iTunes" },
  { value: "appleMusic", label: "Apple Music" },
  { value: "youtube", label: "YouTube" },
  { value: "youtubeMusic", label: "YouTube Music" },
  { value: "google", label: "Google" },
  { value: "googleStore", label: "Google Store" },
  { value: "pandora", label: "Pandora" },
  { value: "deezer", label: "Deezer" },
  { value: "tidal", label: "Tidal" },
  { value: "amazonStore", label: "Amazon Store" },
  { value: "amazonMusic", label: "Amazon Music" },
  { value: "soundcloud", label: "SoundCloud" },
  { value: "napster", label: "Napster" },
  { value: "yandex", label: "Yandex" },
  { value: "spinrilla", label: "Spinrilla" },
  { value: "audius", label: "Audius" },
  { value: "audiomack", label: "Audiomack" },
  { value: "anghami", label: "Anghami" },
  { value: "boomplay", label: "Boomplay" },
] as const;
