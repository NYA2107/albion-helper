import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchInput from "@/components/ui/search-input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { startClock, stopClock } from "@/hooks/useClock";
import useModalMutationDefaultBehavior from "@/hooks/useModalMutationDefaultBehavior";
import { useModalStore } from "@/store";
import { useDebounce } from "@uidotdev/usehooks";
import {
  ActivitySquare,
  ArrowLeft,
  ChartCandlestick,
  Clock,
  PauseIcon,
  PlayIcon,
  Plus,
  StopCircle,
} from "lucide-react";
import moment from "moment";
import { Activity, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useGetPlayerSessionQuery from "../hooks/useGetPlayerSessionQuery";
import useGetSessionByIdQuery from "../hooks/useGetSessionByIdQuery";
import useUpdateSessionMutation from "../hooks/useUpdateSessionMutation";
import useUpsertPlayerSessionMutation from "../hooks/useUpsertPlayerSessionMutation";
import type {
  PlayerLogsType,
  PlayerSessionFormType,
  PlayerSessionType,
  SessionLogsType,
} from "../schema";
import { LogText, StatNumberCard, TimeSessionText } from "./components";
import SessionTabs from "./components/SessionTabs";
import buildChangeStatePlayerPayload from "./lib/buildChangeStatePlayerPayload";
import buildChangeStateSessionPayload from "./lib/buildChangeStateSessionPayload";
import getPlayerDataById from "./lib/getPlayerDataById";

const PartyTimeDetail = () => {
  const { id: sessionId } = useParams();
  const { openModal } = useModalStore();
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);
  const [playerSessionParty, setPlayerSessionParty] = useState<
    PlayerSessionType[]
  >([]);
  const mutationModalDefaultBehavior = useModalMutationDefaultBehavior();
  const { data, isPending } = useGetSessionByIdQuery(parseInt(sessionId!));
  const { data: player } = useGetPlayerSessionQuery(
    parseInt(sessionId!),
    debouncedSearch
  );
  const { mutate: updateSessionMutation, isPending: isPendingSessionMutation } =
    useUpdateSessionMutation();
  const {
    mutate: upsertPlayerSessionMutation,
    isPending: isPendingPlayerMutation,
  } = useUpsertPlayerSessionMutation(mutationModalDefaultBehavior);

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

  const activityLogs = useMemo(() => {
    const dataCopy = [
      ...[],
      ...(data?.logs?.map((v) => ({ ...{}, ...v })) || []),
    ];
    if (!dataCopy) return [];
    return dataCopy?.sort((a, b) => b.timeStamp - a.timeStamp);
  }, [data?.logs]);

  useEffect(() => {
    startClock();
    return () => stopClock();
  }, []);

  const handlePause = () => {
    const timeStampNow = moment().valueOf();
    const payloadPlayerSession: PlayerSessionFormType[] =
      buildChangeStatePlayerPayload(
        parseInt(sessionId!),
        activePlayers,
        "Paused",
        timeStampNow
      );

    const payloadSession = buildChangeStateSessionPayload(
      parseInt(sessionId!),
      data,
      "Paused",
      timeStampNow
    );
    upsertPlayerSessionMutation(payloadPlayerSession, {
      onSuccess: () => {
        updateSessionMutation(payloadSession);
      },
    });
  };

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

  const handleStop = () => {
    const timeStampNow = moment().valueOf();
    const payloadSession = buildChangeStateSessionPayload(
      parseInt(sessionId!),
      data,
      "Stopped",
      timeStampNow
    );
    updateSessionMutation(payloadSession, {
      onSuccess: () => {
        const players = [...activePlayers, ...breakPlayers];
        const payloadPlayers = buildChangeStatePlayerPayload(
          parseInt(sessionId!),
          players,
          "Left",
          timeStampNow
        );
        upsertPlayerSessionMutation(payloadPlayers);
      },
    });
  };

  const handleClickChangePlayerState = (
    id: number,
    state: PlayerLogsType["state"]
  ) => {
    const timeStampNow = moment().valueOf();
    const player: PlayerSessionType | undefined = getPlayerDataById(
      id,
      playerSessionParty
    );
    if (!player) return;
    const playerPayload = buildChangeStatePlayerPayload(
      parseInt(sessionId!),
      [player],
      state,
      timeStampNow
    );
    upsertPlayerSessionMutation(playerPayload);
  };

  return (
    <div>
      <div className="flex justify-between items-end gap-3 mb-3 flex-wrap">
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
          <div className="flex flex-col w-full lg:w-auto justify-end">
            <div className="flex gap-2 items-center justify-end">
              <Clock size={20} />
              <div className="text-xl font-bold text-right ">
                <TimeSessionText logs={data?.logs || []} />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              {data?.state === "Stopped" && data?.logs && (
                <p>
                  Stopped At{" "}
                  {moment(data.logs[data.logs.length - 1].timeStamp).format(
                    "DD MMM YYYY HH:mm"
                  )}
                </p>
              )}
              {data?.state !== "Stopped" && (
                <>
                  {data?.state === "Paused" && (
                    <Button
                      loading={isPendingSessionMutation}
                      disabled={isPendingSessionMutation}
                      onClick={handleStart}
                      variant="ghost"
                    >
                      <PlayIcon />
                      <span className="hidden sm:inline">Start</span>
                    </Button>
                  )}
                  {data?.state === "Active" && (
                    <Button
                      loading={isPendingSessionMutation}
                      disabled={isPendingSessionMutation}
                      onClick={handlePause}
                      variant="ghost"
                    >
                      <PauseIcon />
                      <span className="hidden sm:inline">Pause</span>
                    </Button>
                  )}
                  <Button
                    loading={isPendingSessionMutation}
                    disabled={isPendingSessionMutation}
                    onClick={handleStop}
                    variant="destructive"
                  >
                    <StopCircle />
                    <span className="hidden sm:inline">Stop</span>
                  </Button>
                  <Button
                    loading={isPendingSessionMutation}
                    disabled={isPendingSessionMutation}
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
              <StatNumberCard
                title="Total Player"
                total={playerSessionParty.length}
              />
              <StatNumberCard
                variant="success"
                title="Active"
                total={activePlayers.length}
              />
              <StatNumberCard
                variant="secondary"
                title="On Break"
                total={breakPlayers.length}
              />
              <StatNumberCard
                variant="destructive"
                title="Left"
                total={leftPlayers.length}
              />
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
                  {activityLogs?.map((log) => {
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
            <SearchInput
              inputProps={{
                placeholder: "Search player ....",
                value: search,
                onChange: (e) => setSearch(e.target.value),
              }}
            />
          </div>
          <SessionTabs
            defaultActive={data?.state !== "Stopped" ? "active" : "left"}
            loading={isPendingPlayerMutation}
            activePlayers={activePlayers}
            breakPlayers={breakPlayers}
            leftPlayers={leftPlayers}
            onClickChangeState={handleClickChangePlayerState}
          />
        </div>
      </div>
    </div>
  );
};

export default PartyTimeDetail;
