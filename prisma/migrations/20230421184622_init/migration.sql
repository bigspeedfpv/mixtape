-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('Spotify', 'ITunes', 'AppleMusic', 'Youtube', 'YoutubeMusic', 'Google', 'GoogleStore', 'Pandora', 'Deezer', 'Tidal', 'AmazonStore', 'AmazonMusic', 'SoundCloud', 'Napster', 'Yandex', 'Spinrilla', 'Audius', 'Anghami', 'Boomplay', 'Audiomack');

-- CreateTable
CREATE TABLE "PlatformLink" (
    "uuid" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "link" TEXT NOT NULL,
    "songId" TEXT NOT NULL,

    CONSTRAINT "PlatformLink_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Song" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_PlaylistToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatformLink_link_key" ON "PlatformLink"("link");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaylistToSong_AB_unique" ON "_PlaylistToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaylistToSong_B_index" ON "_PlaylistToSong"("B");

-- AddForeignKey
ALTER TABLE "PlatformLink" ADD CONSTRAINT "PlatformLink_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Playlist"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaylistToSong" ADD CONSTRAINT "_PlaylistToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
