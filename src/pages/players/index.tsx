import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { db } from "@/db";
import useUpdateMenuId from "@/hooks/useUpdateMenuId";
import { MenuIdEnum } from "@/layout/AppLayout/components/Sidebar";
import { useModalStore } from "@/store/modal";
import { useLiveQuery } from "dexie-react-hooks";
import { Plus, Search } from "lucide-react";
import PlayerCard from "./components/PlayerCard";

const PlayerPage = () => {
  useUpdateMenuId(MenuIdEnum["menu-player"]);
  const players = useLiveQuery(() => db.players.toArray());

  const { openModal, closeModal } = useModalStore();

  const handleClickEdit = (id: number) => {
    openModal("edit.player", { id }, async (data) => {
      console.log("EDIT PLAYER", data);
      try {
        if (!data) return;
        const id = await db.players.update(data.id, {
          name: data.name,
          description: data.description,
          tags: data.tags,
          createdAt: new Date().toISOString(),
        });
        console.log("Edited player with id:", id);
      } catch (err) {
        console.error("Failed to edit player:", err);
      }
    });
  };

  const handleClickCreate = () => {
    openModal("create.player", undefined, async (data) => {
      console.log("CREATE PLAYER", data);
      try {
        if (!data) return;
        const id = await db.players.add({
          name: data.name,
          description: data.description,
          tags: data.tags,
          createdAt: new Date().toISOString(),
        });
        console.log("Added player with id:", id);
      } catch (err) {
        console.error("Failed to add player:", err);
      }
    });
  };
  const handleClickDelete = async (id: number) => {
    openModal("delete.confirmation", undefined, async () => {
      try {
        await db.players.delete(id);
        closeModal();
      } catch (err) {
        console.error("Failed to delete player:", err);
      }
    });
  };
  return (
    <div className="flex justify-center py-5">
      <div className="w-full md:w-[500px] lg:w-[800px]">
        <h2 className="text-2xl font-bold">Player Management</h2>
        <p>Create and manage game player</p>
        <div className="flex gap-4 mt-4">
          <InputGroup className="rounded-xl">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>
          <Button onClick={handleClickCreate} className="cursor-pointer">
            <Plus /> <span className="hidden sm:inline">Create Player</span>
          </Button>
        </div>
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
      </div>
    </div>
  );
};

export default PlayerPage;
