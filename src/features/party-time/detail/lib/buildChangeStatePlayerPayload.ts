import moment from "moment";
import type {
  PlayerLogsType,
  PlayerSessionFormType,
  PlayerSessionType,
} from "../../schema";

const buildChangeStatePlayerPayload = (
  sessionId: number,
  prevPlayerData: Partial<PlayerSessionType[]>,
  newState: PlayerSessionType["state"],
  timeStampNow: number = moment().valueOf()
) => {
  let payloadPlayerSession: PlayerSessionFormType[] = [];
  prevPlayerData.forEach((player) => {
    if (!player?.player_id.id) return;
    const newLog: PlayerLogsType = {
      state: newState,
      timeStamp: timeStampNow,
    };
    const newLogs: PlayerLogsType[] = [...player.logs, ...[newLog]];
    const payload: PlayerSessionFormType = {
      player_id: player.player_id.id,
      party_session_id: sessionId,
      state: newState,
      logs: newLogs,
    };

    payloadPlayerSession = [...payloadPlayerSession, ...[payload]];
  });
  return payloadPlayerSession;
};

export default buildChangeStatePlayerPayload;
