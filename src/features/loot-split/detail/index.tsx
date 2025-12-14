import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import type {
  ColDef,
  GetRowIdParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ArrowLeft, Share } from "lucide-react";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";

ModuleRegistry.registerModules([AllCommunityModule]);

type RowType = {
  id: number;
  name: string;
  duration: number;
  durationHourFormat: string;
  percentage: number;
  totalLoot: number;
  date: string;
};

const LootSplitDetail = () => {
  const [rowData] = useState<RowType[]>([
    {
      id: 0,
      name: "Tisu",
      duration: 50000,
      durationHourFormat: "10:20:00",
      percentage: 3,
      totalLoot: 2300000,
      date: moment().toISOString(true),
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const colDefs = useMemo<ColDef[]>(() => {
    return [
      { field: "name", editable: true },
      {
        field: "date",
        editable: true,
        valueFormatter: (params: ValueFormatterParams): string => {
          return moment(params.value).format("DD MMM YYYY HH:mm");
        },
      },
      { field: "duration" },
      { field: "durationHourFormat", editable: true },
      { field: "percentage" },
      { field: "totalLoot" },
    ];
  }, []);

  const getRowId = useCallback(
    (params: GetRowIdParams<RowType>) => `${params.data.id}`,
    []
  );

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
      <ResizablePanel defaultSize={60}>
        <div className="w-full h-full">
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            getRowId={getRowId}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default LootSplitDetail;
