import useUpdateMenuId from "@/hooks/useUpdateMenuId";
import { MenuIdEnum } from "@/layout/AppLayout/components/Sidebar";

const PartyTimePage = () => {
  useUpdateMenuId(MenuIdEnum["menu-party-time"]);
  return (
    <div>
      <h2>Party Time</h2>
    </div>
  );
};

export default PartyTimePage;
