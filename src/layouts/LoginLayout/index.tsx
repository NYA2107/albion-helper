import { useAuthStore } from "@/store";
import { Navigate, Outlet, useSearchParams } from "react-router";
const LoginLayout = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");
  const email = useAuthStore((state) => state.email);

  if (email) {
    return <Navigate to={redirect || "/"} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
