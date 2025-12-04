import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlarmClockMinus, DoorOpenIcon, Zap } from "lucide-react";
import type { PlayerSessionParty } from "../..";
import React, { useState, useTransition, type FC } from "react";
import PlayerSessionCard from "../PlayerSessionCard";
import { Spinner } from "@/components/ui/spinner";

type SessionTabsProps = {
  activePlayers: PlayerSessionParty[];
  breakPlayers: PlayerSessionParty[];
  leftPlayers: PlayerSessionParty[];
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
          Active
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            handleChangeTab("break");
          }}
          className="cursor-pointer"
          value="break"
        >
          <AlarmClockMinus />
          On Break
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            handleChangeTab("left");
          }}
          className="cursor-pointer"
          value="left"
        >
          <DoorOpenIcon />
          Left
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
                    key={v.id}
                    id={v.id}
                    name={v.name}
                    description={v.description}
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
                    key={v.id}
                    id={v.id}
                    name={v.name}
                    description={v.description}
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
                    key={v.id}
                    id={v.id}
                    name={v.name}
                    description={v.description}
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

export default SessionTabs;
