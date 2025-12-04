import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Component, Plus, Search } from "lucide-react";
import SessionCard from "./components/SessionCard";
import { useModalStore } from "@/store";

const PartyTimeList = () => {
  const { openModal } = useModalStore();

  const handleClickCreate = () => {
    openModal("create.session-party");
  };

  return (
    <div>
      <div>
        <div className="flex items-center gap-5">
          <Component size={50} />
          <div>
            <h2 className="text-2xl font-bold ">Party Sessions</h2>
            <p>Party sessions that you have created</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <InputGroup className="rounded-xl">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">2 results</InputGroupAddon>
          </InputGroup>
          <Button onClick={handleClickCreate} className="cursor-pointer">
            <Plus /> <span className="hidden sm:inline">Create Session</span>
          </Button>
        </div>
        <div className="mt-3">
          <SessionCard />
        </div>
      </div>
    </div>
  );
};

export default PartyTimeList;
