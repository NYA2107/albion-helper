import { memo, useMemo, type FC } from "react";
import type { PlayerLogsType } from "../..";
import useClock from "@/hooks/useClock";
import getElapsedTime from "../../lib/getElapsedTime";
import getFormattedTime from "@/lib/getFormattedTime";

const TimerPlayerSessionText: FC<{ logs: PlayerLogsType[] }> = (props) => {
  const { logs } = props;
  const now = useClock();

  const elapsedTime = useMemo(() => {
    return getElapsedTime(logs, now);
  }, [logs, now]);

  return <span>{getFormattedTime(elapsedTime) ?? "-"}</span>;
};

export default memo(TimerPlayerSessionText);
