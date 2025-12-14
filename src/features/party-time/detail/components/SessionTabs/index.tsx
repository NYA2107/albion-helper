import SkeletonCardList from "@/components/shared/SkeletonCardList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  PlayerLogsType,
  PlayerSessionType,
} from "@/features/party-time/schema";
import { AlarmClockMinus, DoorOpenIcon, Zap } from "lucide-react";
import React, { memo, useEffect, useState, type FC } from "react";
import PlayerSessionCard from "../PlayerSessionCard";

type SessionTabsProps = {
  activePlayers: PlayerSessionType[];
  breakPlayers: PlayerSessionType[];
  leftPlayers: PlayerSessionType[];
  onClickChangeState?: (id: number, state: PlayerLogsType["state"]) => void;
  loading?: boolean;
  disabled?: boolean;
  defaultActive?: string;
};

const SessionTabs: FC<SessionTabsProps> = (props) => {
  const {
    activePlayers,
    breakPlayers,
    leftPlayers,
    onClickChangeState,
    loading,
    defaultActive,
    disabled,
  } = props;
  const [activeTab, setActiveTab] = useState<string>(defaultActive || "Active");

  useEffect(() => {
    if (!defaultActive) return;
    setActiveTab(defaultActive);
  }, [defaultActive]);

  const handleChangeTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleChangeTab}
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
          <span className="hidden @sm:inline">Active</span>
          <span>({activePlayers.length})</span>
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            handleChangeTab("break");
          }}
          className="cursor-pointer"
          value="break"
        >
          <AlarmClockMinus />
          <span className="hidden @sm:inline">On Break</span>
          <span>({breakPlayers.length})</span>
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            handleChangeTab("left");
          }}
          className="cursor-pointer"
          value="left"
        >
          <DoorOpenIcon />
          <span className="hidden @sm:inline">Left</span>
          <span>({leftPlayers.length})</span>
        </TabsTrigger>
      </TabsList>
      {loading ? (
        <div className="mt-3">
          <SkeletonCardList total={4} totalColumn={2} />
        </div>
      ) : (
        <React.Fragment>
          <TabsContent value="active">
            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-2">
              {activePlayers.map((v) => {
                if (!v.player_id?.id) return <></>;
                return (
                  <PlayerSessionCard
                    loading={loading}
                    key={v.player_id.id}
                    id={v.player_id.id}
                    name={v.player_id.name}
                    description={v.player_id.description}
                    type="Active"
                    logs={v.logs}
                    disabled={disabled}
                    onClickChangeState={onClickChangeState}
                  />
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="break">
            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-2">
              {breakPlayers.map((v) => {
                if (!v.player_id?.id) return <></>;
                return (
                  <PlayerSessionCard
                    loading={loading}
                    key={v.player_id.id}
                    id={v.player_id.id}
                    name={v.player_id.name}
                    description={v.player_id.description}
                    type="On Break"
                    logs={v.logs}
                    disabled={disabled}
                    onClickChangeState={onClickChangeState}
                  />
                );
              })}
            </div>
          </TabsContent>
          <TabsContent value="left">
            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-2">
              {leftPlayers.map((v) => {
                if (!v.player_id?.id) return <></>;
                return (
                  <PlayerSessionCard
                    loading={loading}
                    key={v.player_id.id}
                    id={v.player_id.id}
                    name={v.player_id.name}
                    description={v.player_id.description}
                    type="Left"
                    logs={v.logs}
                    disabled={disabled}
                    onClickChangeState={onClickChangeState}
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
