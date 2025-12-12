import type { SessionLogsType } from "../../schema";

const getSessionElapsedTime = (logs: SessionLogsType[], now: number) => {
  let elapsedTime = 0;
  let timeStampActive = 0;
  const sessionLogs = logs.filter((v) => v.type === "Session");
  if (logs.length <= 1) return 0;
  for (let i = 0; i < sessionLogs.length - 1; i++) {
    if (i === 0 && sessionLogs[i].state !== "Active") continue;
    if (sessionLogs[i].state === "Active") {
      timeStampActive = sessionLogs[i].timeStamp;
    } else if (sessionLogs[i].state === "Paused") {
      elapsedTime = sessionLogs[i].timeStamp - timeStampActive;
    }
  }
  if (sessionLogs[sessionLogs.length - 1].state === "Active") {
    elapsedTime =
      now - sessionLogs[sessionLogs.length - 1].timeStamp + elapsedTime;
  } else if (
    sessionLogs[sessionLogs.length - 1].state === "Paused" ||
    sessionLogs[sessionLogs.length - 1].state === "Stopped"
  ) {
    elapsedTime =
      sessionLogs[sessionLogs.length - 1].timeStamp -
      timeStampActive +
      elapsedTime;
  }

  return elapsedTime;
};

export default getSessionElapsedTime;
