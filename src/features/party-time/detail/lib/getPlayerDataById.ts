import type { PlayerSessionType } from "../../schema";

const getPlayerDataById = (
  id: number,
  data: PlayerSessionType[]
): PlayerSessionType | undefined => {
  const player = data.find((pl) => pl.player_id.id === id);
  if (!player) return undefined;
  return { ...{}, ...player };
};

export default getPlayerDataById;
