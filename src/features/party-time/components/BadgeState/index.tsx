import { Badge } from "@/components/ui/badge";
import type { FC } from "react";

type BadgeStateProps = {
  state: "Active" | "Paused" | "Stopped" | "On Break" | "Left";
};

const BadgeState: FC<BadgeStateProps> = ({ state }) => {
  return (
    <Badge
      variant={
        state === "Active"
          ? "default"
          : state === "Paused"
            ? "secondary"
            : state === "Stopped"
              ? "destructive"
              : "outline"
      }
    >
      {state}
    </Badge>
  );
};

export default BadgeState;
