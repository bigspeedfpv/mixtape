import React from "react";

import type { GetServerSidePropsContext, NextPage } from "next";
import { type Playlist, PrismaClient, type Song } from "@prisma/client";
import SongList from "~/components/songlist";
import { songsAtom } from "~/atoms";
import { useSetAtom } from "jotai";

type PlaylistPageProps = {
  playlist: Playlist & { songs: Song[] } ;
};

const PlaylistPage: NextPage<PlaylistPageProps> = (props) => {
  const setPlaylist = useSetAtom(songsAtom);

  React.useEffect(() => {
    setPlaylist(props.playlist.songs);
  }, [props.playlist, setPlaylist]);

  return <SongList />;
};

export default PlaylistPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { uuid } = context.query;

  const client = new PrismaClient();

  const playlist = await client.playlist.findUnique({
    where: {
      uuid: uuid as string,
    },
    include: {
      songs: true,
    },
  });

  console.log(playlist);

  return {
    props: {
      playlist: {
        ...playlist,
        accessedAt: playlist?.accessedAt.getUTCSeconds(),
      }
    },
  };
}
