import { useAuthStore } from "@/context/useAuthStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const refresh = useAuthStore((s) => s.refresh);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
