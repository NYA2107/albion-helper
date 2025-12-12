import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlarmClockMinus, DoorOpenIcon, Zap } from "lucide-react";
import React, { memo, useState, useTransition, type FC } from "react";
import PlayerSessionCard from "../PlayerSessionCard";
import { Spinner } from "@/components/ui/spinner";
import type { PlayerSessionType } from "@/features/party-time/schema";

type SessionTabsProps = {
  activePlayers: PlayerSessionType[];
  breakPlayers: PlayerSessionType[];
  leftPlayers: PlayerSessionType[];
};

const SessionTabs: FC<SessionTabsProps> = (props) => {
  const { activePlayers, breakPlayers, leftPlayers } = props;
  const [activeTab, setActiveTab] = useState<string>("active");
  const [isPending, startTransition] = useTransition();

  const handleChangeTab = (tabId: string) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleChangeTab}
      defaultValue="active"
      className="w-full mt-4"
    >
      <TabsList className="w-full">
        <TabsTrigger
          onClick={() => {
            handleChangeTab("active");
          }}
          className="cursor-pointer"
          value="active"
        >
          <Zap />
          Active ({activePlayers.length})
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            handleChangeTab("break");
          }}
          className="cursor-pointer"
          value="break"
        >
          <AlarmClockMinus />
          On Break ({breakPlayers.length})
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            handleChangeTab("left");
          }}
          className="cursor-pointer"
          value="left"
        >
          <DoorOpenIcon />
          Left ({leftPlayers.length})
        </TabsTrigger>
      </TabsList>
      {isPending ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <React.Fragment>
          <TabsContent value="active">
            <div className="flex flex-col gap-3">
              {activePlayers.map((v) => {
                return (
                  <PlayerSessionCard
                    key={v.player_id.id}
                    id={v.player_id.id}
                    name={v.player_id.name}
                    description={v.player_id.description}
                    type="Active"
                    logs={v.logs}
                  />
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="break">
            <div className="flex flex-col gap-3">
              {breakPlayers.map((v) => {
                return (
                  <PlayerSessionCard
                    key={v.player_id.id}
                    id={v.player_id.id}
                    name={v.player_id.name}
                    description={v.player_id.description}
                    type="On Break"
                    logs={v.logs}
                  />
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="left">
            <div className="flex flex-col gap-3">
              {leftPlayers.map((v) => {
                return (
                  <PlayerSessionCard
                    key={v.player_id.id}
                    id={v.player_id.id}
                    name={v.player_id.name}
                    description={v.player_id.description}
                    type="Left"
                    logs={v.logs}
                  />
                );
              })}
            </div>
          </TabsContent>
        </React.Fragment>
      )}
    </Tabs>
  );
};

export default memo(SessionTabs);
