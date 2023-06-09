import { type Song } from "@prisma/client";
import * as Toast from "@radix-ui/react-toast";
import { useAtom } from "jotai";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { songsAtom } from "~/atoms";
import SongList from "~/components/songlist";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [song, setSong] = useState("");
  const [songsList, setSongsList] = useAtom(songsAtom);
  const [error, setError] = useState(false);

  const createPlaylist = api.playlist.savePlaylist.useMutation();

  const songQuery = api.song.getSongByLink.useQuery(
    { link: song },
    {
      enabled: false,
      retry: false,
      onError: () => setError(true),
      onSuccess: (data) => addSongToList(data),
    }
  );

  const updateSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSong(e.target.value);
  };

  const addSongToList = (fetchedSong: Song) => {
    if (songsList.find((s) => s.uuid === fetchedSong.uuid)) return;

    setSongsList((prev) => [...prev, fetchedSong]);
  };

  return (
    <>
      <Head>
        <title>Mixtape</title>
        <meta
          name="description"
          content="Create playlists you can open on any platform."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toast.Provider>
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100">
          <div className="flex w-4/5 max-w-xl items-center gap-4">
            <input
              type="text"
              placeholder="Enter a song link..."
              className="h-10 w-full max-w-lg rounded-lg border-[1px] border-black border-opacity-10 bg-gray-50 p-3 text-lg font-semibold text-gray-800 shadow-lg outline-none transition duration-300 placeholder-shown:font-normal hover:shadow-xl focus:shadow-glowBlue"
              onChange={updateSong}
            />
            <button
              onClick={() => {
                void songQuery.refetch();
              }}
              className="text-md h-10 rounded-lg border-[1px] border-white border-opacity-10 bg-blue-500 px-6 py-2 font-semibold text-white shadow-lg transition duration-300 hover:shadow-xl"
            >
              Add
            </button>
          </div>

          <SongList editable />

          <button
            onClick={() => {
              void createPlaylist.mutateAsync(songsList);
            }}
            className="text-md h-10 w-4/5 max-w-xl rounded-lg border-[1px] border-white border-opacity-10 bg-violet-500 px-6 py-2 font-semibold text-white shadow-lg transition duration-300 hover:shadow-xl"
          >
            Create Playlist
          </button>
        </main>

        <Toast.Root open={error} onOpenChange={setError} className="ToastRoot">
          <Toast.Title className="ToastTitle">Error!</Toast.Title>
          <Toast.Description asChild>
            <span className="ToastDescription">
              Unable to find that song! Please check the URL and try again.
            </span>
          </Toast.Description>
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    </>
  );
};

export default Home;
