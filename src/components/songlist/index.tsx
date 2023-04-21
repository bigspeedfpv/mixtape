import { Song } from "@prisma/client";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useAtom } from "jotai";
import { songsAtom } from "~/atoms";

type SongListProps = {
  editable?: boolean;
};

export default function SongList(props: SongListProps) {
  const songsList = useAtom(songsAtom);

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport />
    </ScrollArea.Root>
  );
}
