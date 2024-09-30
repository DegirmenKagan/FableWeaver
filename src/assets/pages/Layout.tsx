import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function Layout() {
  return (
    <div>
      <ResponsiveAppBar />
      <hr />
      <Outlet />
    </div>
  );
}
