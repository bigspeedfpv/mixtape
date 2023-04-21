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

  const [errorState, setErrorState] = useState(false);

  const updateSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSong(e.target.value);
  };

  const addSong = () => {
    const fetchedSong = api.song.getSongByLink.useQuery({ link: song });

    if (!fetchedSong.data) {
      setErrorState(true);
      return;
    }

    setSongsList((prev) => [...prev, fetchedSong.data]);
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter a song link..."
            className="border-1 h-16 w-screen max-w-lg rounded-lg border-[1px] bg-gray-50 p-5 text-xl font-bold text-gray-800 shadow-lg outline-none transition duration-300 placeholder-shown:border-transparent placeholder-shown:bg-gray-700 placeholder-shown:font-normal placeholder-shown:text-slate-100 focus:bg-gray-50 focus:text-gray-800 focus:shadow-glow"
            onChange={updateSong}
          />
          <button
            onClick={addSong}
            className="text-md rounded-lg border-[1px] border-white border-opacity-10 bg-blue-500 px-6 py-2 font-semibold text-white shadow-md transition duration-300 hover:shadow-glowBlue"
          >
            Add
          </button>
        </div>
        <SongList />
      </main>
    </>
  );
};

export default Home;
