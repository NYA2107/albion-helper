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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useUpdateMenuId from "@/hooks/useUpdateMenuId";
import { MenuIdEnum } from "@/layout/AppLayout/components/Sidebar";
import {
  ActivitySquare,
  AlarmClockMinus,
  ArrowLeft,
  ChartCandlestick,
  DoorOpenIcon,
  PlayIcon,
  Plus,
  Search,
  StopCircle,
  Zap,
} from "lucide-react";
import LogText from "./components/LogText";
import PlayerSessionCard from "./components/PlayerSessionCard";
import StatNumberCard from "./components/StatNumberCard";

const PartyTimePage = () => {
  useUpdateMenuId(MenuIdEnum["menu-party-time"]);
  return (
    <div>
      <div className="flex justify-between items-center gap-3 mb-3">
        <div>
          <Button className="p-0!" variant="link">
            <ArrowLeft />
            Back
          </Button>
          <h2 className="text-2xl font-bold">Party Time</h2>
          <p>Manage and track player activity</p>
        </div>
        <div>
          <div className="flex gap-2">
            <Button variant="ghost">
              <PlayIcon />
              <span className="hidden md:inline">Start</span>
            </Button>
            <Button variant="destructive-ghost">
              <StopCircle />
              <span className="hidden md:inline">Stop</span>
            </Button>
            <Button variant="default" className="cursor-pointer">
              <Plus /> <span className="hidden sm:inline">Add Player</span>
            </Button>
          </div>
        </div>
      </div>
      <Accordion type="single" collapsible>
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
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
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
          <Tabs defaultValue="active" className="w-full mt-4">
            <TabsList className="w-full">
              <TabsTrigger className="cursor-pointer" value="active">
                <Zap />
                Active
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="break">
                <AlarmClockMinus />
                On Break
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="left">
                <DoorOpenIcon />
                Left
              </TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <div className="flex flex-col gap-3">
                <PlayerSessionCard type="Active" />
              </div>
            </TabsContent>
            <TabsContent value="break">
              <div className="flex flex-col gap-3">
                <PlayerSessionCard type="On Break" />
              </div>
            </TabsContent>
            <TabsContent value="left">
              <div className="flex flex-col gap-3">
                <PlayerSessionCard type="Left" />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PartyTimePage;
