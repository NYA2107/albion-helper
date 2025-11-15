import AppLayout from "@/layout/AppLayout";
import LootSplitPage from "@/pages/loot-split";
import PartyTimePage from "@/pages/party-time";
import PlayerPage from "@/pages/players";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <div>Home</div>,
  },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      {
        path: "party-time",
        Component: PartyTimePage,
      },
      {
        path: "loot-split",
        Component: LootSplitPage,
      },
      {
        path: "player",
        Component: PlayerPage,
      },
      {
        path: "discord",
        Component: () => <div>Discord</div>,
      },
    ],
  },
]);

export default router;
