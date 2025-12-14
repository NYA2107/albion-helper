import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Share } from "lucide-react";
import { Link } from "react-router";

const LootSplitDetail = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={40}>
        <div className="p-5">
          <div className="flex justify-between items-end gap-3 mb-3 flex-wrap">
            <div>
              <Link to={`/app/loot-split`}>
                <Button className="p-0!" variant="link">
                  <ArrowLeft />
                  Back
                </Button>
              </Link>
              <h2 className="text-2xl font-bold">Nama Loot Split</h2>
              <p>Deskripsi loot split</p>
            </div>
            <div>
              <Button variant="secondary">
                <Share />
                Share
              </Button>
            </div>
          </div>
          <Separator className="my-2" />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}></ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default LootSplitDetail;
