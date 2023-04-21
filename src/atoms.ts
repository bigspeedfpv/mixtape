import { type Song } from "@prisma/client";
import { atom } from "jotai";

export const songsAtom = atom<Song[]>([]);