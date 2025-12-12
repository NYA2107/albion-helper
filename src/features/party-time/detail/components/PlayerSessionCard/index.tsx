import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlarmClockMinus, Clock, DoorOpen, Zap } from "lucide-react";
import moment from "moment";
import { memo, type FC } from "react";
import TimerPlayerSessionText from "../TimePlayerSessionText";
import type { PlayerLogsType } from "@/features/party-time/schema";

export interface PlayerSessionCardProps {
  type: "Active" | "On Break" | "Left";
  id?: number;
  logs?: PlayerLogsType[];
  name?: string;
  description?: string;
}

const PlayerSessionCard: FC<PlayerSessionCardProps> = (props) => {
  const { type, logs = [], name, description } = props;

  return (
    <Card
      className={cn(
        "border-green-600 border-b-2 border-r-2 drop-shadow-green-700 drop-shadow-md",
        type === "On Break" &&
          "border-secondary-foreground drop-shadow-secondary-foreground",
        type === "Left" && "border-destructive drop-shadow-destructive"
      )}
    >
      <CardContent className="">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-accent-foreground">{description}</p>
          </div>
          <div>
            <div className="flex gap-2 items-center justify-start sm:justify-end">
              <Clock size={12} />
              <h1 className="text-l font-bold text-right">
                <TimerPlayerSessionText logs={logs} />
              </h1>
            </div>
            <p className="text-xs">
              Joined at{" "}
              {moment(logs[logs.length - 1].timeStamp).format(
                "DD MMM YY HH:mm:s"
              )}
            </p>
          </div>
        </div>
        <CardAction className="flex gap-3 pt-4">
          {type === "Active" && (
            <>
              <Button
                variant="secondary"
                className="hover:text-secondary hover:bg-secondary-foreground"
              >
                <AlarmClockMinus />
                Break
              </Button>
              <Button variant="destructive-ghost">
                <DoorOpen />
                Leave
              </Button>
            </>
          )}
          {type === "On Break" && (
            <>
              <Button
                variant="secondary"
                className="bg-green-600 text-accent hover:text-green-800 dark:bg-transparent dark:text-primary-foreground dark:hover:bg-green-600 dark:hover:text-green-50"
              >
                <Zap />
                Set to Active
              </Button>
              <Button variant="destructive-ghost">
                <DoorOpen />
                Leave
              </Button>
            </>
          )}
        </CardAction>
      </CardContent>
    </Card>
  );
};

export default memo(PlayerSessionCard);
