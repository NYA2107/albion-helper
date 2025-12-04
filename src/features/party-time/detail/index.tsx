import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { startClock, stopClock } from "@/hooks/useClock";
import {
  ActivitySquare,
  ArrowLeft,
  ChartCandlestick,
  Clock,
  PlayIcon,
  Plus,
  Search,
  StopCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { LogText, StatNumberCard, TimeSessionText } from "./components";
import SessionTabs from "./components/SessionTabs";
import { useModalStore } from "@/store";
import type { PartySessionType } from "../list/schema";

export interface PlayerLogsType {
  state: "Active" | "On Break" | "Left" | "Paused";
  timeStamp: number;
}

export interface PlayerSessionParty {
  id: number;
  name: string;
  description: string;
  state: "Active" | "On Break" | "Left";
  logs: PlayerLogsType[];
}

const dummySession: PartySessionType = {
  id: 1,
  name: "Session Name",
  state: "Active",
  logs: [
    {
      id: 1,
      name: "Session",
      type: "Session",
      state: "Paused",
      timeStamp: 1764579029704,
    },
    {
      id: 2,
      name: "Session",
      type: "Session",
      state: "Active",
      timeStamp: 1764579029800,
    },
  ],
};

const generateDummyPlayer = (): PlayerSessionParty[] => {
  return new Array(1000).fill({}).map(() => {
    return {
      id: Math.random(),
      name: "Tisu Paseo",
      description: "This is description of the player",
      state:
        Math.random() <= 0.2
          ? "Active"
          : Math.random() <= 0.6
          ? "On Break"
          : "Left",
      logs: [
        {
          state: "Paused",
          timeStamp: 1764566114971,
        },
        {
          state: "Active",
          timeStamp: 1764566122964,
        },
      ],
    };
  });
};

const PartyTimeDetail = () => {
  const dummyPlayerSessionParty: PlayerSessionParty[] = generateDummyPlayer();
  const { openModal } = useModalStore();
  const [session] = useState<PartySessionType>(dummySession);
  const [playerSessionParty] = useState<PlayerSessionParty[]>(
    dummyPlayerSessionParty
  );

  const activePlayers = useMemo(
    () => playerSessionParty.filter((player) => player.state === "Active"),
    [playerSessionParty]
  );
  const breakPlayers = useMemo(
    () => playerSessionParty.filter((player) => player.state === "On Break"),
    [playerSessionParty]
  );
  const leftPlayers = useMemo(
    () => playerSessionParty.filter((player) => player.state === "Left"),
    [playerSessionParty]
  );

  useEffect(() => {
    startClock();
    return () => stopClock();
  }, []);

  const handleClickAddPlayer = () => {
    openModal("add.player");
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-3 mb-3 flex-wrap">
        <div>
          <Button className="p-0!" variant="link">
            <ArrowLeft />
            Back
          </Button>
          <h2 className="text-2xl font-bold">Party Time</h2>
          <p>Manage and track player activity</p>
        </div>
        <div className="justify-end w-full lg:w-auto">
          <div className="flex gap-2 items-center justify-end">
            <Clock size={20} />
            <div className="text-xl font-bold text-right ">
              <TimeSessionText logs={session.logs || []} />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost">
              <PlayIcon />
              <span className="hidden sm:inline">Start</span>
            </Button>
            <Button variant="destructive-ghost">
              <StopCircle />
              <span className="hidden sm:inline">Stop</span>
            </Button>
            <Button
              onClick={handleClickAddPlayer}
              variant="default"
              className="cursor-pointer"
            >
              <Plus /> <span className="hidden sm:inline">Add Player</span>
            </Button>
          </div>
        </div>
      </div>
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mt-1 p-2 rounded-lg cursor-pointer pt-3">
            <span className="flex gap-2">
              <ChartCandlestick /> Statistics
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-2 gap-2">
              <StatNumberCard title="Total Player" total={3} />
              <StatNumberCard variant="success" title="Active" total={2} />
              <StatNumberCard variant="secondary" title="On Break" total={2} />
              <StatNumberCard variant="destructive" title="Left" total={2} />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="mt-1 p-2 rounded-lg cursor-pointer pt-3">
            <span className="flex gap-2">
              <ActivitySquare /> Activity Logs
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <Card className="w-full py-3 my-3 ">
              <CardContent className="pb-6">
                <h3 className="font-bold p-0 m-0!">Activity Logs</h3>
                <Separator className="mt-2" />
                <ScrollArea className="w-full h-[100px] mt-3">
                  <LogText />
                </ScrollArea>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Separator />
      <div className="flex flex-wrap gap-3">
        <div className="w-full">
          <div className="flex gap-4 mt-4">
            <InputGroup className="rounded-xl">
              <InputGroupInput
                onChange={() => {}}
                placeholder="Search player..."
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <SessionTabs
            activePlayers={activePlayers}
            breakPlayers={breakPlayers}
            leftPlayers={leftPlayers}
          />
        </div>
      </div>
    </div>
  );
};

export default PartyTimeDetail;
