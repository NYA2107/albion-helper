import BadgeState from "@/features/party-time/components/BadgeState";
import type { SessionLogsType } from "@/features/party-time/schema";
import { cn } from "@/lib/utils";
import moment from "moment";
import type { FC } from "react";

type LogTextProps = {
  log: SessionLogsType;
};

const LogText: FC<LogTextProps> = (props) => {
  const { log } = props;
  return (
    <p className="flex justify-between px-2 py-1 gap-2">
      <span>
        <span
          className={cn(
            "font-bold",
            log.type === "Session" && "text-accent-foreground"
          )}
        >
          {log.name}{" "}
        </span>{" "}
        <span>is set to </span>
        <BadgeState state={log.state} />
      </span>
      <span className={cn("text-secondary-foreground")}>
        {moment(log.timeStamp).format("DD/MM/YY HH:mm:s")}
      </span>
    </p>
  );
};

export default LogText;
