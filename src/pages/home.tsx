import { Outlet } from "react-router-dom";
import { Navigation } from "../components/navigation";
import Box from "@mui/material/Box";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Navigation />
      <Box sx={{ padding: "1rem", flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
