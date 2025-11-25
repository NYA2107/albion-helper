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
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import PlayerCard from "./components/PlayerCard";
import usePlayerPageQuery from "./hooks/usePlayerPageQuery";

const PlayerPage = () => {
  useUpdateMenuId(MenuIdEnum["menu-player"]);
  const [search, setSearch] = useState<string>("");
  const debouncedFilter = useDebounce(search, 1000);
  const { createMutation, updateMutation, deleteMutation, players, isPending } =
    usePlayerPageQuery({ search: debouncedFilter });
  const { openModal, closeModal } = useModalStore();

  const handleClickEdit = (id: number) => {
    openModal("edit.player", { id }, async (data) => {
      if (!data) return;
      updateMutation.mutate(data);
      closeModal();
    });
  };

  const handleClickCreate = () => {
    openModal("create.player", undefined, async (data) => {
      if (!data) return;
      createMutation.mutate(data);
      closeModal();
    });
  };
  const handleClickDelete = async (id: number) => {
    openModal("delete.confirmation", undefined, async () => {
      deleteMutation.mutate(id);
      closeModal();
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="flex justify-center py-5">
      <div className="w-full md:w-[500px] lg:w-[800px]">
        <h2 className="text-2xl font-bold">Player Management</h2>
        <p>Create and manage game player</p>
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
        {isPending ? (
          <div className="flex justify-center m-4">
            <Spinner className="w-10 h-10" />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
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
    </div>
  );
};

export default PlayerPage;
