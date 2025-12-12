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
import { Spinner } from "@/components/ui/spinner";
import { startClock, stopClock } from "@/hooks/useClock";
import { useModalStore } from "@/store";
import {
  ActivitySquare,
  ArrowLeft,
  ChartCandlestick,
  Clock,
  PauseIcon,
  PlayIcon,
  Plus,
  Search,
  StopCircle,
} from "lucide-react";
import React, { Activity, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useGetPlayerSessionQuery from "../hooks/useGetPlayerSessionQuery";
import useGetSessionByIdQuery from "../hooks/useGetSessionByIdQuery";
import { LogText, StatNumberCard, TimeSessionText } from "./components";
import SessionTabs from "./components/SessionTabs";
import type {
  PlayerLogsType,
  PlayerSessionFormType,
  PlayerSessionType,
  SessionLogsType,
} from "../schema";
import moment from "moment";
import useUpdateSessionMutation from "../hooks/useUpdateSessionMutation";
import useUpsertPlayerSessionMutation from "../hooks/useUpsertPlayerSessionMutation";

// export interface PlayerSessionParty {
//   id: number;
//   name: string;
//   description: string;
//   state: "Active" | "On Break" | "Left";
//   logs: PlayerLogsType[];
// }

// const generateDummyPlayer = (): PlayerSessionParty[] => {
//   return new Array(20).fill({}).map(() => {
//     return {
//       id: Math.random(),
//       name: "Tisu Paseo",
//       description: "This is description of the player",
//       state:
//         Math.random() <= 0.2
//           ? "Active"
//           : Math.random() <= 0.6
//             ? "On Break"
//             : "Left",
//       logs: [
//         {
//           state: "Paused",
//           timeStamp: 1764566114971,
//         },
//         {
//           state: "Active",
//           timeStamp: 1764566122964,
//         },
//       ],
//     };
//   });
// };

const PartyTimeDetail = () => {
  // const dummyPlayerSessionParty: PlayerSessionParty[] = generateDummyPlayer();
  const { id: sessionId } = useParams();
  const { openModal } = useModalStore();
  const [playerSessionParty, setPlayerSessionParty] = useState<
    PlayerSessionType[]
  >([]);
  const { data, isPending } = useGetSessionByIdQuery(parseInt(sessionId!));
  const { data: player } = useGetPlayerSessionQuery(parseInt(sessionId!));
  const { mutate: updateSessionMutation } = useUpdateSessionMutation();
  const { mutate: upsertPlayerSessionMutation } =
    useUpsertPlayerSessionMutation();

  useEffect(() => {
    if (!player) return;
    setPlayerSessionParty(player);
  }, [player]);

  const activePlayers = useMemo(
    () =>
      playerSessionParty.filter(
        (player) => player.state === "Active" || player.state === "Paused"
      ),
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
    openModal<"add.player">(
      "add.player",
      { sessionId: parseInt(sessionId!) },
      (selectedPlayer) => {
        const payloadPlayerSession: PlayerSessionFormType[] =
          selectedPlayer.map((playerId) => {
            const logs: PlayerLogsType[] =
              data?.state === "Active"
                ? [
                    {
                      state: "Paused",
                      timeStamp: moment().valueOf(),
                    },
                    {
                      state: "Active",
                      timeStamp: moment().valueOf(),
                    },
                  ]
                : [
                    {
                      state: "Paused",
                      timeStamp: moment().valueOf(),
                    },
                  ];
            return {
              player_id: playerId,
              logs: logs,
              state: data?.state === "Active" ? "Active" : "Paused",
              party_session_id: parseInt(sessionId!),
            };
          });
        upsertPlayerSessionMutation(payloadPlayerSession);
        console.log(payloadPlayerSession);
      }
    );
  };

  const handleStart = () => {
    if (!data?.logs) return;
    const timeStampNow = moment().valueOf();
    const payloadSessionLog: SessionLogsType = {
      id: Math.random(),
      name: "Session",
      type: "Session",
      state: "Active",
      timeStamp: timeStampNow,
    };
    updateSessionMutation(
      {
        id: parseInt(sessionId!),
        logs: [...data.logs, ...[payloadSessionLog]],
        state: "Active",
      },
      {
        onSuccess: () => {
          const payload: Partial<PlayerSessionFormType[]> = [];
          activePlayers.map((v) => {
            if (!v.player_id?.id) return v;

            const addedLog: PlayerLogsType = {
              state: "Active",
              timeStamp: timeStampNow,
            };
            payload.push({
              player_id: v.player_id.id,
              party_session_id: parseInt(sessionId!),
              state: "Active",
              logs: [...v.logs, ...[addedLog]],
            });
            return v;
          });
          upsertPlayerSessionMutation(payload);
        },
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-3 mb-3 flex-wrap">
        <Activity mode={isPending || !data ? "visible" : "hidden"}>
          <Spinner />
        </Activity>
        <Activity mode={!isPending && data ? "visible" : "hidden"}>
          <div>
            <Link to={`/app/party-time`}>
              <Button className="p-0!" variant="link">
                <ArrowLeft />
                Back
              </Button>
            </Link>
            <h2 className="text-2xl font-bold">{data?.name}</h2>
            <p>{data?.description}</p>
          </div>
          <div className="justify-end w-full lg:w-auto">
            <div className="flex gap-2 items-center justify-end">
              <Clock size={20} />
              <div className="text-xl font-bold text-right ">
                <TimeSessionText logs={data?.logs || []} />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              {data?.state !== "Stopped" && (
                <>
                  {data?.state === "Paused" && (
                    <Button onClick={handleStart} variant="ghost">
                      <PlayIcon />
                      <span className="hidden sm:inline">Start</span>
                    </Button>
                  )}
                  {data?.state === "Active" && (
                    <Button variant="ghost">
                      <PauseIcon />
                      <span className="hidden sm:inline">Pause</span>
                    </Button>
                  )}
                  <Button variant="destructive">
                    <StopCircle />
                    <span className="hidden sm:inline">Stop</span>
                  </Button>
                  <Button
                    onClick={handleClickAddPlayer}
                    variant="default"
                    className="cursor-pointer"
                  >
                    <Plus />{" "}
                    <span className="hidden sm:inline">Add Player</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </Activity>
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
                  {data?.logs?.map((log) => {
                    return <LogText key={log.id} log={log} />;
                  })}
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
              <InputGroupInput placeholder="Search player..." />
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
