import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import useUpdateMenuId from "@/hooks/useUpdateMenuId";
import { MenuIdEnum } from "@/layout/AppLayout/components/Sidebar";
import { Plus, Search } from "lucide-react";
import moment from "moment";
import PlayerCard from "./components/PlayerCard";
import WritePlayerDialog from "./components/WritePlayerDialog";
import type { PlayerType } from "./schema";
import ConfirmationDeleteDialog from "@/components/ui/confirmation-delete-dialog";
import useDialog from "@/hooks/useDialog";
import { useState } from "react";

const dummyPlayers: PlayerType[] = [
  {
    id: 0,
    name: "Aragorn",
    description: "This is description",
    tags: ["Def-Tank", "Support", "Officer"],
    createdAt: moment().toISOString(),
  },
  {
    id: 1,
    name: "Aragorn",
    description: "This is description",
    tags: ["Def-Tank", "Support", "Member"],
    createdAt: moment().toISOString(),
  },
  {
    id: 2,
    name: "Aragorn",
    description: "This is description",
    tags: ["Def-Tank", "Support", "Officer"],
    createdAt: moment().toISOString(),
  },
];

const PlayerPage = () => {
  useUpdateMenuId(MenuIdEnum["menu-player"]);
  const {
    isOpen: isOpenCreate,
    onClose: onCloseCreate,
    onOpen: onOpenCreate,
  } = useDialog();
  const {
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
  } = useDialog();
  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDialog();
  const [editId, setEditId] = useState<number>();

  const handleClickEdit = (id: number) => {
    setEditId(id);
    onOpenEdit();
  };

  return (
    <div className="flex justify-center py-5">
      <WritePlayerDialog open={isOpenCreate} onClose={onCloseCreate} />
      <WritePlayerDialog
        id={editId}
        isEdit
        open={isOpenEdit}
        onClose={onCloseEdit}
      />
      <ConfirmationDeleteDialog open={isOpenDelete} onNo={onCloseDelete} />
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
          <Button onClick={onOpenCreate} className="cursor-pointer">
            <Plus /> <span className="hidden sm:inline">Create Player</span>
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
          {dummyPlayers.map((pl) => (
            <PlayerCard
              key={`player-${pl.id}`}
              data={pl}
              onClickDelete={onOpenDelete}
              onClickEdit={handleClickEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
