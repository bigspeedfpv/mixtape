import { type Platform } from "@prisma/client";
import { type SonglinkPlatformLink } from "./types";

export function createPlatformLinkArray(
  data: Record<Platform, SonglinkPlatformLink>
): SanitizedPlatformLink[] {
  const platformArray: Platform[] = Object.keys(data).map(
    (key) => key as Platform
  );
  const linkArray: SonglinkPlatformLink[] = Object.values(data);
  const formattedPlatformLinkArray = [];

  for (let i = 0; i < platformArray.length; i++) {
    // this always exists but TS doesn't know that
    // i ALMOST miss rust
    const platform = platformArray[i];
    const platformLink = linkArray[i];
    if (!platform || !platformLink) {
      continue;
    }

    formattedPlatformLinkArray.push({
      platform: platform,
      ...platformLink,
    });
  }

  return formattedPlatformLinkArray;
}

// I think I'm in hell
type SanitizedPlatformLink = SonglinkPlatformLink & {
  platform: Platform;
};
