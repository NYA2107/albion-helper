import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import useUpdateMenuId from "@/hooks/useUpdateMenuId";
import { MenuIdEnum } from "@/layout/AppLayout/components/Sidebar";
import { useModalStore } from "@/store/modal";
import { useDebounce } from "@uidotdev/usehooks";
import { Cat, DatabaseIcon, Plus, Search } from "lucide-react";
import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import usePlayerPageQuery from "./hooks/usePlayerPageQuery";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const PlayerPage = () => {
  useUpdateMenuId(MenuIdEnum["menu-player"]);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 1000);
  const { createMutation, updateMutation, deleteMutation, players, isPending } =
    usePlayerPageQuery({ search: debouncedSearch });
  const { openModal, setLoadingModal } = useModalStore();

  const handleClickEdit = (id: number) => {
    openModal("edit.player", { id }, async (data) => {
      if (!data) return;
      updateMutation.mutate(data);
      setLoadingModal(true);
    });
  };

  const handleClickCreate = () => {
    openModal("create.player", undefined, async (data) => {
      if (!data) return;
      createMutation.mutate(data);
      setLoadingModal(true);
    });
  };
  const handleClickDelete = async (id: number) => {
    openModal("delete.confirmation", undefined, async () => {
      deleteMutation.mutate(id);
      setLoadingModal(true);
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div>
      <div className="flex items-center gap-5">
        <Cat size={50} />
        <div>
          <h2 className="text-2xl font-bold ">Player Management</h2>
          <p>Create and manage game player</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <InputGroup className="rounded-xl">
          <InputGroupInput
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {players?.length} results
          </InputGroupAddon>
        </InputGroup>
        <Button onClick={handleClickCreate} className="cursor-pointer">
          <Plus /> <span className="hidden sm:inline">Create Player</span>
        </Button>
      </div>
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
          <EmptyContent>
            <div className="flex gap-2">
              <Button onClick={handleClickCreate}>Create Player</Button>
            </div>
          </EmptyContent>
        </Empty>
      )}
      {isPending ? (
        <div className="flex justify-center m-4">
          <Spinner className="w-10 h-10" />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {players?.map((pl) => (
            <PlayerCard
              key={`player-${pl.id}`}
              data={pl}
              onClickDelete={handleClickDelete}
              onClickEdit={handleClickEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerPage;
