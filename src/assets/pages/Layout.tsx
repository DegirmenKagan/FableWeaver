import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function Layout() {
  return (
    <div>
      <ResponsiveAppBar />
      <div style={{ marginBlock: 20 }}>
        <Outlet />
      </div>
    </div>
  );
}
