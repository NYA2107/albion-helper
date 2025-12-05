/* eslint-disable react-hooks/rules-of-hooks */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Pencil, Trash } from "lucide-react";
import moment from "moment";
import { Activity, createContext, useContext, type FC, type PropsWithChildren } from "react";
import type { PlayerResponseItemType } from "../../../features/players/schema";

type PlayerCardContextType = {
  data: PlayerResponseItemType;
  onClickDelete?: (id: number) => void;
  onClickEdit?: (id: number) => void;
  hideActions?: boolean;
  
}

const PlayerCardContext = createContext<PlayerCardContextType>({
  data: {
    id: 0,
    name: "",
    description: "",
    created_at: "",
    tags: [],
  },
  onClickDelete: undefined,
  onClickEdit: undefined,
  hideActions: false,
  
  
});

const usePlayerCard = () => {
  const context = useContext(PlayerCardContext);
  if (!context) {
    throw new Error('PlayerCard compound components must be used within PlayerCard');
  }
  return context;
};

type PlayerCardProps = {
  data: PlayerResponseItemType;
  onClickDelete?: (id: number) => void;
  onClickEdit?: (id: number) => void;
  children?:React.ReactNode
};

const PlayerCard: FC<PlayerCardProps> & { Header: React.FC, Actions: React.FC, Tags: React.FC, CreatedAt: React.FC, HeaderWrapper:React.FC<PropsWithChildren> } = (props) => {
  const {children} = props
  return (
    <PlayerCardContext.Provider value={props}>
      <Card>
        <CardContent>
          <Activity mode={children ? "visible":"hidden"}>
            {children}
          </Activity>
          <Activity mode={!children ? "visible":"hidden"}>
            <>
              <PlayerCard.HeaderWrapper>
                <PlayerCard.Header />
                <PlayerCard.Actions />
              </PlayerCard.HeaderWrapper>
              <PlayerCard.Tags />
              <PlayerCard.CreatedAt />
            </>
          </Activity>
        </CardContent>
      </Card>
    </PlayerCardContext.Provider>
  );
};

PlayerCard.HeaderWrapper = ({children}) => {
  return (
    <div className="flex justify-between gap-2">
      {children}
    </div>
  )
}

PlayerCard.Header = () => {
  const { data: { name, description } } = usePlayerCard();
  return (
    <div>
    <h3 className="font-bold">{name}</h3>
    <p className="text-sm text-accent-foreground">{description}</p>
  </div>
  )
}

PlayerCard.Actions = () => {
  const { onClickDelete, onClickEdit, data:{id} } = usePlayerCard();
  return (
    <div>
      <Button variant="ghost" className="cursor-pointer" size="icon-xs" onClick={() =>id !== undefined && onClickEdit && onClickEdit(id)}><Pencil /></Button>
      <Button className="cursor-pointer" variant="destructive-ghost" size="icon-xs" onClick={() =>id !== undefined && onClickDelete && onClickDelete(id)}><Trash /></Button>
    </div>
  )
}

PlayerCard.Tags = () => {
  const { data: { tags } } = usePlayerCard();
  return (
    <div className="w-full flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
      ))}
    </div>
  )
}

PlayerCard.CreatedAt = () => {
  const { data: { created_at } } = usePlayerCard();
  return (
    <>
    <Separator className="my-3" />
    <p className="text-sm">
      Created at {moment(created_at).format("DD MMMM YYYY")}
    </p>
    </>
  )
}

export default PlayerCard;
