import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalculatorIcon, EyeIcon } from "lucide-react";
import moment from "moment";
import { Link } from "react-router";

const SessionCard = () => {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="grid grid-cols-1 gap-1">
              <h2 className="text-lg font-bold">Ganking</h2>
              <Separator className="inline sm:hidden" />
              <p className="text-accent-foreground">
                This is the description of the content
              </p>
            </div>

            <div className="flex flex-row sm:flex-col items-center sm:items-end mt-3 sm:mt-0 gap-2 sm:gap-0">
              <Badge variant="secondary">Active</Badge>
              <p className="text-sm mt-0 sm:mt-3 text-left sm:text-right">
                Created at {moment().format("DD MMM YYYY")}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end items-center">
            <Separator className="hidden sm:inline" orientation="vertical" />
            <Link to="id">
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
