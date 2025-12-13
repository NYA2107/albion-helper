import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BadgeState from "@/features/party-time/components/BadgeState";
import { CalculatorIcon, EyeIcon } from "lucide-react";
import moment from "moment";
import type { FC } from "react";
import { Link } from "react-router";
import type { PartySessionType } from "../../../schema";

type SessionCardPropsType = {
  id: number;
  name: string;
  description?: string;
  state?: PartySessionType["state"];
  createdAt?: string;
};

const SessionCard: FC<SessionCardPropsType> = (props) => {
  const { id, name, description, state, createdAt } = props;
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="grid grid-cols-1 gap-1">
              <h2 className="text-lg font-bold">{name}</h2>
              <Separator className="inline sm:hidden" />
              <p className="text-accent-foreground">{description}</p>
            </div>

            <div className="flex flex-row sm:flex-col items-center sm:items-end mt-3 sm:mt-0 gap-2 sm:gap-0">
              <BadgeState state={state || "Active"} />
              <p className="text-sm mt-0 sm:mt-3 text-left sm:text-right">
                Created at {moment(createdAt).format("DD MMM YYYY")}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end items-center">
            <Separator className="hidden sm:inline" orientation="vertical" />
            <Link to={`${id}`}>
              <Button variant="outline" className="flex items-center">
                <EyeIcon />
                <span className="inline sm:hidden md:hidden lg:inline">
                  View
                </span>
              </Button>
            </Link>
            <Button variant="outline">
              <CalculatorIcon />
              <span className="inline sm:hidden md:hidden lg:inline">
                Split Loot
              </span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
