import React from "react";

import { type Song } from "@prisma/client";
import { useAtomValue } from "jotai";
import { songsAtom } from "~/atoms";
import { Item } from "./item";

type SongListProps = {
  editable?: boolean;
};

export default function SongList(props: SongListProps) {
  const songsList = useAtomValue(songsAtom);

  return (
    <div className="h-96 w-4/5 max-w-xl overflow-y-auto rounded-md border-[1px] border-black border-opacity-10 bg-white shadow-xl">
      <div className="flex flex-col items-center gap-4 px-12 py-6">
        {songsList.map((song: Song, index) => (
          <React.Fragment key={song.uuid}>
            <Item song={song} editable={props.editable || false} />

            {index !== songsList.length - 1 && (
              <span
                key={song.uuid + "-sep"}
                className="h-[1px] w-64 bg-black opacity-10"
              ></span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
