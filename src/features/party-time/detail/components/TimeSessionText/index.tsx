import { memo, useMemo, type FC } from "react";
import useClock from "@/hooks/useClock";
import getSessionElapsedTime from "../../lib/getSessionElapsedTime";
import getFormattedTime from "@/lib/getFormattedTime";
import type { SessionLogsType } from "@/features/party-time/schema";

const TimeSessionText: FC<{ logs: SessionLogsType[] }> = (props) => {
  const { logs } = props;
  const now = useClock();

  const elapsedTime = useMemo(() => {
    return getSessionElapsedTime(logs, now);
  }, [logs, now]);
  return <span>{getFormattedTime(elapsedTime)}</span>;
};

export default memo(TimeSessionText);
