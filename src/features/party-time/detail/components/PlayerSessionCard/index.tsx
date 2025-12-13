import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PlayerLogsType } from "@/features/party-time/schema";
import { cn } from "@/lib/utils";
import { AlarmClockMinus, Clock, DoorOpen, Zap } from "lucide-react";
import moment from "moment";
import { memo, type FC } from "react";
import TimerPlayerSessionText from "../TimePlayerSessionText";

export interface PlayerSessionCardProps {
  type: "Active" | "On Break" | "Left";
  id: number;
  logs?: PlayerLogsType[];
  name?: string;
  description?: string;
  onClickChangeState?: (id: number, state: PlayerLogsType["state"]) => void;
  loading?: boolean;
  disabled?: boolean;
}

const PlayerSessionCard: FC<PlayerSessionCardProps> = (props) => {
  const {
    id,
    type,
    logs = [],
    name,
    description,
    onClickChangeState,
    loading,
    disabled,
  } = props;

  return (
    <Card
      className={cn(
        "border-primary",
        type === "On Break" && "border-secondary-foreground",
        type === "Left" && "border-destructive"
      )}
    >
      <CardContent className="h-full grid grid-cols-1 @4xl:grid-cols-[1fr_auto] gap-3">
        <div className="flex flex-col @xl:flex-row justify-between gap-3 @xl:items-center">
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-accent-foreground">{description}</p>
          </div>
          <div>
            <div className="flex gap-2 items-center justify-end ">
              <Clock size={12} />
              <h1 className="text-l font-bold text-right">
                <TimerPlayerSessionText logs={logs} />
              </h1>
            </div>
            <p className="text-xs text-right">
              Joined at{" "}
              {moment(logs[logs.length - 1].timeStamp).format(
                "DD MMM YY HH:mm:s"
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-1 items-end @3xl:items-center">
          {type === "Active" && (
            <>
              <Button
                loading={loading}
                disabled={loading || disabled}
                onClick={() => onClickChangeState?.(id, "On Break")}
                variant="secondary"
                className="hover:text-secondary hover:bg-secondary-foreground"
              >
                <AlarmClockMinus />
                <span className="hidden @2xl:inline">Break</span>
              </Button>
              <Button
                loading={loading}
                disabled={loading || disabled}
                onClick={() => onClickChangeState?.(id, "Left")}
                variant="destructive-ghost"
              >
                <DoorOpen />
                <span className="hidden @2xl:inline">Leave</span>
              </Button>
            </>
          )}
          {type === "On Break" && (
            <>
              <Button
                loading={loading}
                disabled={loading || disabled}
                onClick={() => onClickChangeState?.(id, "Active")}
                variant="default"
              >
                <Zap />
                <span className="hidden @2xl:inline">Set to Active</span>
              </Button>
              <Button
                loading={loading}
                disabled={loading || disabled}
                onClick={() => onClickChangeState?.(id, "Left")}
                variant="destructive-ghost"
              >
                <DoorOpen />
                <span className="hidden @2xl:inline">Leave</span>
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(PlayerSessionCard);
