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
        <span className="text-secondary-foreground font-bold">
          {log.state}{" "}
        </span>
      </span>
      <span className={cn("text-secondary-foreground")}>
        {moment(log.timeStamp).format("DD/MM/YYYY HH:mm:s")}
      </span>
    </p>
  );
};

export default LogText;
