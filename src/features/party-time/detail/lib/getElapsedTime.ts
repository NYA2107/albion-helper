import type { PlayerLogsType } from "../../schema";

const getElapsedTime = (logs: PlayerLogsType[], now: number) => {
  let elapsedTime = 0;
  let timeStampActive = 0;
  if (logs.length <= 1) return 0;
  for (let i = 0; i < logs.length - 1; i++) {
    if (i === 0 && logs[i].state !== "Active") continue;
    if (logs[i].state === "Active") {
      timeStampActive = logs[i].timeStamp;
    } else if (logs[i].state === "On Break" || logs[i].state === "Paused") {
      elapsedTime = logs[i].timeStamp - timeStampActive;
    }
  }
  if (logs[logs.length - 1].state === "Active") {
    elapsedTime = now - logs[logs.length - 1].timeStamp + elapsedTime;
  } else if (
    logs[logs.length - 1].state === "On Break" ||
    logs[logs.length - 1].state === "Paused"
  ) {
    elapsedTime =
      logs[logs.length - 1].timeStamp - timeStampActive + elapsedTime;
  }
  console.log(elapsedTime, "A");
  return elapsedTime;
};

export default getElapsedTime;
