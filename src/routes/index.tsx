import withSidebarMenu from "@/components/hoc/withSideBarMenu";
import AppLayout from "@/layouts/AppLayout";
import { MenuIdEnum } from "@/layouts/AppLayout/components/Sidebar";
import LoginLayout from "@/layouts/LoginLayout";
import LoginPage from "@/pages/auth/login/LoginPage";
import RegisterPage from "@/pages/auth/register/RegisterPage";
import LootSplitDetailPage from "@/pages/loot-split/LootSplitDetailPage";
import LootSplitListPage from "@/pages/loot-split/LootSplitListPage";
import PartyTimeDetailPage from "@/pages/party-time/PartyTimeDetailPage";
import PartyTimeListPage from "@/pages/party-time/PartyTimeListPage";
import PlayerPage from "@/pages/players/PlayerPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: () => <div>Home</div>,
  },
  {
    path: "/auth",
    Component: LoginLayout,
    children: [{ path: "login", Component: LoginPage }],
  },
  { path: "/register", Component: RegisterPage },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      {
        path: "party-time",
        Component: withSidebarMenu(
          PartyTimeListPage,
          MenuIdEnum["menu-party-time"]
        ),
      },
      {
        path: "party-time/:id",
        Component: withSidebarMenu(
          PartyTimeDetailPage,
          MenuIdEnum["menu-party-time"]
        ),
      },
      {
        path: "loot-split",
        Component: withSidebarMenu(
          LootSplitListPage,
          MenuIdEnum["menu-loot-split"]
        ),
      },
      {
        path: "loot-split/:id",
        Component: withSidebarMenu(
          LootSplitDetailPage,
          MenuIdEnum["menu-loot-split"]
        ),
      },
      {
        path: "player",
        Component: withSidebarMenu(PlayerPage, MenuIdEnum["menu-player"]),
      },
      {
        path: "discord",
        Component: () => <div>Discord</div>,
      },
    ],
  },
]);

export default router;
