import { micah } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

//Avatar generator
export const avatarGenerator = (seed: string | undefined) => {
  if (seed === undefined) {
    const avatar = createAvatar(micah, { seed: "1" });
    return avatar.toDataUri();
  }
  const avatar = createAvatar(micah, {
    seed: seed,
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdbbf"],
    baseColor: ["77311d", "ac6651", "f9c9b6"],
    hair: ["dannyPhantom", "dougFunny", "fonze", "pixie"],
    mouth: ["laughing", "smile", "smirk"],
    hairColor: ["ffeba4", "000000", "77311d"],
  });
  return avatar.toDataUri();
};
