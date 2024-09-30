import { Outlet } from "react-router-dom";
import CustomLink from "../components/CustomLink";

export default function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <CustomLink to="/Home" />
          </li>
          <li>
            <CustomLink to="/Create" />
          </li>
          <li>
            <CustomLink to="/Read" />
          </li>
          <li>
            <CustomLink to="/error" />
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}
