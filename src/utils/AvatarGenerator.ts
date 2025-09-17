import { funEmoji } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

//Avatar generator
export const avatarGenerator = (seed: string | undefined) => {
  if (seed === undefined) {
    const avatar = createAvatar(funEmoji, { seed: "1" });
    return avatar.toDataUri();
  }
  const avatar = createAvatar(funEmoji, {
    seed: seed,
    mouth: [
      "cute",
      "lilSmile",
      "smileLol",
      "kissHeart",
      "tongueOut",
      "wideSmile",
      "smileTeeth",
    ],
  });
  return avatar.toDataUri();
};
