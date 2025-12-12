import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/search-input";
import { Spinner } from "@/components/ui/spinner";
import useModalMutationDefaultBehavior from "@/hooks/useModalMutationDefaultBehavior";
import { useModalStore } from "@/store";
import { useDebounce } from "@uidotdev/usehooks";
import { Component, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import useCreateSessionMutation from "../hooks/useCreateSessionMutation";
import useGetSessionQuery from "../hooks/useGetSessionQuery";
import SessionCard from "./components/SessionCard";

const PartyTimeList = () => {
  const { openModal } = useModalStore();
  const mutationModalDefaultBehavior = useModalMutationDefaultBehavior();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const { data, isPending } = useGetSessionQuery(debouncedSearch);

  const { mutate: createMutation } = useCreateSessionMutation(
    mutationModalDefaultBehavior
  );

  const handleClickCreate = () => {
    openModal("create.session-party", undefined, (payload) => {
      if (!payload) return;
      createMutation(payload, {
        onSuccess: (id) => {
          navigate(`${id}`);
        },
      });
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
          <SearchInput
            inputProps={{
              placeholder: "Search party sessions...",
              onChange: (e) => setSearch(e.target.value),
            }}
            totalResults={data?.length}
          />
          <Button onClick={handleClickCreate} className="cursor-pointer">
            <Plus /> <span className="hidden sm:inline">Create Session</span>
          </Button>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {isPending && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {data?.map((session) => {
            return (
              <SessionCard
                key={session.id}
                id={session.id!}
                name={session.name}
                description={session.description}
                state={session.state}
                createdAt={session.createdAt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PartyTimeList;
