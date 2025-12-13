import type { PlayerLogsType } from "../../schema";

const getElapsedTime = (logs: PlayerLogsType[], now: number) => {
  let elapsedTime = 0;
  let timeStampActive = 0;
  if (logs.length <= 1) return 0;
  for (let i = 0; i < logs.length - 1; i++) {
    if (i === 0 && logs[0].state !== "Active") continue;
    if (logs[i].state === "Active") {
      timeStampActive = logs[i].timeStamp;
    } else if (logs[i].state === "On Break" || logs[i].state === "Paused") {
      elapsedTime = elapsedTime + (logs[i].timeStamp - timeStampActive);
    }
  }
  if (logs[logs.length - 1].state === "Active") {
    elapsedTime = now - logs[logs.length - 1].timeStamp + elapsedTime;
  } else if (
    logs[logs.length - 1].state === "On Break" ||
    logs[logs.length - 1].state === "Paused" ||
    logs[logs.length - 1].state === "Left"
  ) {
    if (logs[logs.length - 2].state === "Active") {
      elapsedTime =
        logs[logs.length - 1].timeStamp - timeStampActive + elapsedTime;
    }
  }
  return elapsedTime;
};

export default getElapsedTime;
