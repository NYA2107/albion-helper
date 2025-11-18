import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash } from "lucide-react";
import type { PlayerType } from "../../schema";
import type { FC } from "react";
import moment from "moment";

interface PlayerCardProps {
  data: PlayerType;
  onClickDelete?: (id: number) => void;
  onClickEdit?: (id: number) => void;
}

const PlayerCard: FC<PlayerCardProps> = (props) => {
  const {
    data: { name, tags, description, createdAt, id },
    onClickDelete,
    onClickEdit,
  } = props;

  return (
    <Card>
      <CardContent>
        <div className="">
          <div className="flex justify-between gap-2">
            <div>
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm">{description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  id !== undefined && onClickEdit && onClickEdit(id)
                }
                variant="ghost"
                className="cursor-pointer"
                size="icon-xs"
              >
                <Pencil />
              </Button>
              <Button
                onClick={() =>
                  id !== undefined && onClickDelete && onClickDelete(id)
                }
                className="cursor-pointer"
                variant="destructive-ghost"
                size="icon-xs"
              >
                <Trash />
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Separator className="my-3" />
          <p className="text-sm">
            Ceated at {moment(createdAt).format("DD MMMM YYYY")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
