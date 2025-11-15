import useUpdateMenuId from "@/hooks/useUpdateMenuId";
import { MenuIdEnum } from "@/layout/AppLayout/components/Sidebar";

const PlayerPage = () => {
  useUpdateMenuId(MenuIdEnum["menu-player"]);
  return (
    <div>
      <h2>Player Management</h2>
    </div>
  );
};

export default PlayerPage;
