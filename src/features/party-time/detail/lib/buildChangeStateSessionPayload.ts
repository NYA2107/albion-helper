import moment from "moment";
import type { PartySessionType, SessionLogsType } from "../../schema";

const buildChangeStateSessionPayload = (
  sessionId: number,
  prevSessionData?: PartySessionType,
  newState: PartySessionType["state"] = "Active",
  timeStampNow: number = moment().valueOf()
) => {
  const newSessionLog: SessionLogsType = {
    id: Math.random(),
    name: "Session",
    state: newState,
    timeStamp: timeStampNow,
    type: "Session",
  };
  const newSessionLogs: SessionLogsType[] = [
    ...(prevSessionData?.logs || []),
    ...[newSessionLog],
  ];
  const payloadSession: Partial<PartySessionType> = {
    id: sessionId,
    state: newState,
    logs: newSessionLogs,
  };

  return payloadSession;
};
export default buildChangeStateSessionPayload;
