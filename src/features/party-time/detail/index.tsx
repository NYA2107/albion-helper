import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchInput from "@/components/ui/search-input";
import { Separator } from "@/components/ui/separator";
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
import SkeletonDetail from "./components/SkeletonDetail";
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
  const { data: player, isPending: isPendingPlayerQuery } =
    useGetPlayerSessionQuery(parseInt(sessionId!), debouncedSearch);
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
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={40}>
          <ScrollArea className="h-dvh p-5 @container">
            <Activity mode={isPending || !data ? "visible" : "hidden"}>
              <SkeletonDetail />
            </Activity>
            <Activity mode={!isPending && data ? "visible" : "hidden"}>
              <div className="flex justify-between items-end gap-3 mb-3 flex-wrap">
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
                <div className="flex flex-col w-full @lg:w-auto justify-end">
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
                        {moment(
                          data.logs[data.logs.length - 1].timeStamp
                        ).format("DD MMM YYYY HH:mm")}
                      </p>
                    )}
                    {data?.state !== "Stopped" && (
                      <>
                        {data?.state === "Paused" && (
                          <Button
                            loading={
                              isPendingSessionMutation ||
                              isPendingPlayerMutation
                            }
                            disabled={
                              isPendingSessionMutation ||
                              isPendingPlayerMutation
                            }
                            onClick={handleStart}
                          >
                            <PlayIcon />
                            <span className="hidden @sm:inline">Start</span>
                          </Button>
                        )}
                        {data?.state === "Active" && (
                          <Button
                            loading={
                              isPendingSessionMutation ||
                              isPendingPlayerMutation
                            }
                            disabled={
                              isPendingSessionMutation ||
                              isPendingPlayerMutation
                            }
                            onClick={handlePause}
                            variant="secondary"
                          >
                            <PauseIcon />
                            <span className="hidden @sm:inline">Pause</span>
                          </Button>
                        )}
                        <Button
                          loading={
                            isPendingSessionMutation || isPendingPlayerMutation
                          }
                          disabled={
                            isPendingSessionMutation || isPendingPlayerMutation
                          }
                          onClick={handleStop}
                          variant="destructive"
                        >
                          <StopCircle />
                          <span className="hidden @sm:inline">Stop</span>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Separator />
              <h3 className="flex gap-2 mt-5">
                <ChartCandlestick /> Statistics
              </h3>
              <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-4 gap-2 mt-4">
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
              <h3 className="flex gap-2 mt-5">
                <ActivitySquare /> Activity Logs
              </h3>
              <Card className="w-full h-full py-3 my-3 ">
                <CardContent className="pb-6">
                  <ScrollArea className="w-full h-full mt-3">
                    {activityLogs?.map((log) => {
                      return <LogText key={log.id} log={log} />;
                    })}
                  </ScrollArea>
                </CardContent>
              </Card>
            </Activity>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <ScrollArea className="h-dvh p-5 @container">
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
                  <Button
                    loading={isPendingSessionMutation}
                    disabled={isPendingSessionMutation}
                    onClick={handleClickAddPlayer}
                    variant="default"
                    className="cursor-pointer"
                  >
                    <Plus />{" "}
                    <span className="hidden @sm:inline">Add Player</span>
                  </Button>
                </div>
                <SessionTabs
                  disabled={data?.state !== "Active"}
                  defaultActive={data?.state !== "Stopped" ? "active" : "left"}
                  loading={
                    isPendingPlayerMutation || isPending || isPendingPlayerQuery
                  }
                  activePlayers={activePlayers}
                  breakPlayers={breakPlayers}
                  leftPlayers={leftPlayers}
                  onClickChangeState={handleClickChangePlayerState}
                />
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>

      <Separator />
    </div>
  );
};

export default PartyTimeDetail;
