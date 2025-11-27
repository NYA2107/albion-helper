import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlarmClockMinus, Clock, DoorOpen, Zap } from "lucide-react";
import moment from "moment";
import type { FC } from "react";

export interface PlayerSessionCardProps {
  type: "Active" | "On Break" | "Left";
}

const PlayerSessionCard: FC<PlayerSessionCardProps> = (props) => {
  const { type } = props;
  return (
    <Card
      className={cn(
        "border-green-600 border-b-5 border-r-5",
        type === "On Break" && "border-secondary-foreground",
        type === "Left" && "border-destructive"
      )}
    >
      <CardContent className="">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <h3 className="font-bold">Tisu Paseo</h3>
            <p className="text-accent-foreground">Player description</p>
          </div>
          <div>
            <div className="flex gap-2 items-center justify-start sm:justify-end">
              <Clock size={12} />
              <h1 className="text-l font-bold text-right">
                <span>1m 47s</span>
              </h1>
            </div>
            <p className="text-xs">
              Joined at {moment().format("DD MMM YY HH:mm:s")}
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
                className="bg-green-600 text-accent hover:text-green-800"
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

export default PlayerSessionCard;
