/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";

import type { Platform, PlatformLink, Song } from "@prisma/client";
import { useSetAtom } from "jotai";
import { songsAtom } from "~/atoms";
import { IconLink } from "@tabler/icons-react";

type ItemProps = {
  editable: boolean;
  platform?: Platform;
  song: Song & { platformLinks?: PlatformLink[] };
};

export function Item(props: ItemProps) {
  const setSongsList = useSetAtom(songsAtom);

  const truncate = (str: string) => {
    if (str.length > 32) {
      return str.slice(0, 32) + "...";
    }
    return str;
  };

  const [title, artist] = useMemo(() => {
    return [truncate(props.song.title), truncate(props.song.artist)];
  }, [props.song.title, props.song.artist]);

  // db returns links for EVERY platform so we just filter them down here
  const url = useMemo(() => {
    if (props.platform) {
      return props.song.platformLinks?.find(
        (link) => link.platform === props.platform
      )?.link;
    }
  }, [props.platform, props.song.platformLinks]);

  const removeSong = (uuid: string) => {
    setSongsList((prev) => prev.filter((song) => song.uuid !== uuid));
  };

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <img
        src={props.song.coverArt || ""}
        alt={`${props.song.title} album cover`}
        className="h-12 w-12 rounded-md shadow-md"
      />

      <div className="flex w-full flex-col justify-center">
        <div className="font-bold">{title}</div>
        <div className="text-sm font-semibold opacity-50">{artist}</div>
      </div>

      <span className="h-[1px] grow bg-black opacity-10"></span>

      {props.platform && (
        <a title="Song Link" href={url} target="_blank" rel="noreferrer">
          <IconLink size={24} className="opacity-50" />
        </a>
      )}

      {props.editable && url && (
        <button
          onClick={() => {
            removeSong(props.song.uuid);
          }}
          className="text-md h-10 rounded-lg border-[1px] border-white border-opacity-10 bg-red-500 px-6 py-2 font-semibold text-white shadow-lg transition duration-300 hover:shadow-xl"
        >
          Remove
        </button>
      )}
    </div>
  );
}
