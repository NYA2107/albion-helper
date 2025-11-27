import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FC } from "react";

export interface StatNumberCardProps {
  variant?: "default" | "secondary" | "success" | "destructive";
  title: string;
  total: number;
}

const StatNumberCard: FC<StatNumberCardProps> = (props) => {
  const { variant, title, total } = props;
  return (
    <Card className="py-3">
      <CardContent
        className={cn(
          ``,
          !variant || variant === "default" || "",
          variant === "secondary" && "text-secondary-foreground",
          variant === "success" && "text-green-700",
          variant === "destructive" && "text-destructive"
        )}
      >
        <h3>{title}</h3>
        <h2 className="text-2xl font-bold">{total}</h2>
      </CardContent>
    </Card>
  );
};

export default StatNumberCard;
