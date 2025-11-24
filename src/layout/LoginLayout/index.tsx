import { useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router";
const LoginLayout = () => {
  const email = useAuthStore((state) => state.email);

  if (email) {
    return <Navigate to="/app/player" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
