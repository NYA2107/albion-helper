import AppLayout from "@/layout/AppLayout";
import LoginLayout from "@/layout/LoginLayout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
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
    path: "/",
    Component: LoginLayout,
    children: [{ path: "login", Component: Login }],
  },
  { path: "/register", Component: Register },
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
