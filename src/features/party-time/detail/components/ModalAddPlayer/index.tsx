import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import PlayerCard from "@/components/shared/PlayerCard";
import useCreatePlayerMutation from "@/features/players/hooks/useCreatePlayerMutation";
import useGetPlayerQuery from "@/features/players/hooks/useGetPlayerQuery";
import { useDebounce } from "@uidotdev/usehooks";
import {
  CircleQuestionMark,
  DatabaseIcon,
  PlusIcon,
  Search,
  XIcon,
} from "lucide-react";
import { useCallback, useState, type FC } from "react";
type ModalAddPlayerProps = {
  loading?: boolean;
  onClose?: () => void;
  onSubmit?: (payload: undefined) => void;
};

type SelectedPlayerType = {
  id: number;
  name: string;
};

const ModalAddPlayer: FC<ModalAddPlayerProps> = (props) => {
  const { loading, onClose } = props;
  const [selectedPlayer, setSelectedPlayer] = useState<SelectedPlayerType[]>(
    []
  );
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const { data: players, isPending } = useGetPlayerQuery(debouncedSearch);
  const [isConfirmCreate, setIsConfirmCreate] = useState<boolean>(false);
  const { mutate: createMutation, isPending: isPendingCreate } =
    useCreatePlayerMutation();

  const handleClose = (open: boolean) => {
    if (open || !onClose) return;
    onClose();
  };

  const handleCheckedChange = useCallback(
    (checked: boolean, id: number, name: string) => {
      setSelectedPlayer((prev) => {
        if (checked) {
          return [...prev, ...[{ id, name }]];
        }
        return prev.filter((player) => player.id !== id);
      });
    },
    []
  );

  const handleSubmit = () => {
    createMutation({ name: search });
    setIsConfirmCreate(false);
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Player</DialogTitle>
          <DialogDescription>
            Player should be unique from data players that already exist
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="flex gap-2 pb-3">
            <InputGroup className="rounded-xl">
              <InputGroupInput
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search or Create Player"
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <Button
              disabled={debouncedSearch === "" || isPendingCreate}
              loading={isPendingCreate}
              onClick={() => {
                setIsConfirmCreate(true);
              }}
            >
              <PlusIcon />{" "}
              <span className="hidden sm:inline">Create Player</span>
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-250px)] px-3">
            <div>
              <div>
                {isConfirmCreate && (
                  <div className="p-3 mt-2">
                    <p className="mb-3">
                      <span className="flex gap-1 items-center">
                        <CircleQuestionMark size={17} />
                        Create new player ?
                      </span>
                    </p>
                    <div className="p-2">
                      <Label>Name</Label>
                      <p className="my-2 border-2 rounded-lg px-3 py-2">
                        {search}
                      </p>
                    </div>

                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        onClick={() => setIsConfirmCreate(false)}
                        size="sm"
                        variant="secondary"
                      >
                        Cencel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        loading={isPending}
                        disabled={isPending}
                        form="form-create-player"
                        type="submit"
                        size="sm"
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="mt-1 rounded-lg cursor-pointer pt-3">
                    <h3 className="font-bold text-md">
                      Selected Player ({selectedPlayer.length} Player)
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ScrollArea className="max-h-[100px]">
                      <div className="flex gap-2 flex-wrap">
                        {selectedPlayer.map((v) => (
                          <Badge
                            className="cursor-pointer hover:bg-primary-foreground hover:text-primary"
                            onClick={() =>
                              handleCheckedChange(false, v.id, v.name)
                            }
                            key={v.id}
                          >
                            {v.name} <XIcon />
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {players && players?.length <= 0 && (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <DatabaseIcon />
                    </EmptyMedia>
                    <EmptyTitle>No Player Found</EmptyTitle>
                    <EmptyDescription>
                      Get started by creating a player.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}
              {isPending ? (
                <div className="flex justify-center m-4">
                  <Spinner className="w-10 h-10" />
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-2">
                  {players?.map((pl) => (
                    <div
                      key={pl.id}
                      className="grid grid-cols-[auto_1fr] gap-2 pr-3"
                    >
                      <Checkbox
                        checked={
                          selectedPlayer.filter((v) => v.id === pl.id).length >
                          0
                        }
                        onCheckedChange={(checked) =>
                          handleCheckedChange(
                            checked === "indeterminate" ? true : checked,
                            pl.id,
                            pl.name
                          )
                        }
                        className="cursor-pointer border-accent-foreground"
                      />
                      <PlayerCard hideActions data={pl} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <div className="flex gap-2">
            <Button
              disabled={loading}
              onClick={() => handleClose(false)}
              variant="ghost"
            >
              Cencel
            </Button>
            <Button
              loading={loading}
              disabled={loading}
              form="form-create-player"
              type="submit"
            >
              Add Player
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddPlayer;
