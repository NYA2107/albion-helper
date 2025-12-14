import SkeletonCardList from "@/components/shared/SkeletonCardList";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchInput from "@/components/ui/search-input";
import { BadgeCent, Plus } from "lucide-react";
import { useState } from "react";

const LootSplitList = () => {
  const [search, setSearch] = useState<string>("");

  const handleClickCreate = () => {};

  return (
    <ScrollArea className="p-5 h-dvh">
      <div>
        <div className="flex items-center gap-5">
          <BadgeCent size={50} />
          <div>
            <h2 className="text-2xl font-bold ">Loot Split</h2>
            <p>Loot split that you have created</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <SearchInput
            inputProps={{
              placeholder: "Search loot split ...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
            }}
            totalResults={2}
          />
          <Button onClick={handleClickCreate} className="cursor-pointer">
            <Plus /> <span className="hidden sm:inline">Create Loot Split</span>
          </Button>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <SkeletonCardList total={3} totalColumn={1} />
        </div>
      </div>
    </ScrollArea>
  );
};

export default LootSplitList;
