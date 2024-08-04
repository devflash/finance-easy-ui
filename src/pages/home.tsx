import { Outlet } from "react-router-dom";
import { Navigation } from "../components/navigation";

export const Home = () => {
  return (
    // sidebar component
    <div>
      <Navigation />
      <div>
        <Outlet />
      </div>
    </div>
  );
};
