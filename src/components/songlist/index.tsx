import React from "react";

import { type Song } from "@prisma/client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useAtom } from "jotai";
import { songsAtom } from "~/atoms";

type SongListProps = {
  editable?: boolean;
};

export default function SongList(props: SongListProps) {
  const [songsList, setSongsList] = useAtom(songsAtom);

  return (
    <ScrollArea.Root className="h-96 w-4/5 max-w-xl overflow-hidden rounded-md border-[1px] border-black border-opacity-10 bg-white shadow-xl">
      <ScrollArea.Viewport className="h-full w-full">
        <div className="flex flex-col items-center gap-4 px-12 py-6">
          {songsList.map((song: Song, index) => (
            <React.Fragment key={song.uuid}>
              <div key={song.uuid + "-container"} className="flex w-full justify-center gap-4">
                <div
                  key={song.uuid + "-details"}
                  className="flex w-full flex-col justify-center"
                >
                  <div key={song.uuid + "-title"} className="font-bold">
                    {song.title}
                  </div>
                  <div
                    key={song.uuid + "-artist"}
                    className="text-sm font-semibold opacity-50"
                  >
                    {song.artist}
                  </div>
                </div>
              </div>

              {index !== songsList.length - 1 && (
                <span
                  key={song.uuid + "-sep"}
                  className="h-[1px] w-64 bg-black opacity-10"
                ></span>
              )}
            </React.Fragment>
          ))}
        </div>
      </ScrollArea.Viewport>
    </ScrollArea.Root>
  );
}
