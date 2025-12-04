import moment from "moment";

const getFormattedTime = (timeMs: number) => {
  if (timeMs <= 0) return "0h 0m 0s";
  const duration = moment.duration(timeMs);
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${hours}h ${minutes}m ${seconds}s`;
};

export default getFormattedTime;
