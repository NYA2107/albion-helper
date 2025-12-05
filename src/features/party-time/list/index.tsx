import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Component, Plus, Search } from "lucide-react";
import SessionCard from "./components/SessionCard";
import { useModalStore } from "@/store";
import useCreateSessionMutation from "../hooks/useCreateSessionMutation";
import useModalMutationDefaultBehavior from "@/hooks/useModalMutationDefaultBehavior";
import useGetSessionQuery from "../hooks/useGetSessionQuery";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

const PartyTimeList = () => {
  const { openModal } = useModalStore();
  const mutationModalDefaultBehavior = useModalMutationDefaultBehavior();
  const navigate = useNavigate()
  const [search, setSearch] = useState<string>("")
  const debouncedSearch = useDebounce(search, 500)
  const {data, isPending} = useGetSessionQuery(debouncedSearch)

  const {mutate:createMutation} = useCreateSessionMutation(mutationModalDefaultBehavior)

  const handleClickCreate = () => {
    openModal("create.session-party", undefined, (payload) => {
      if(!payload) return
      createMutation(payload, {onSuccess:(id) => {
        navigate(`${id}`)
      }})
    });
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
            <InputGroupInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">2 results</InputGroupAddon>
          </InputGroup>
          <Button onClick={handleClickCreate} className="cursor-pointer">
            <Plus /> <span className="hidden sm:inline">Create Session</span>
          </Button>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {isPending && 
            <div className="flex justify-center">
              <Spinner />
            </div>
          }
          {data?.map(session => {
            return (
              <SessionCard key={session.id} id={session.id!} name={session.name} description={session.description} state={session.state}  createdAt={session.createdAt}/>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default PartyTimeList;
