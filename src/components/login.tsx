import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Input } from "../components/common/input";

export const Login = () => (
  <Box
    sx={{
      height: "100vh",
      padding: "1rem",
    }}
  >
    <Typography component="h1" sx={{ fontSize: "2.8rem", color: "#112D4E" }}>
      Finance Easy
    </Typography>

    <Paper
      sx={{
        width: "100%",
        maxWidth: "420px",
        padding: "2rem 1rem",
        margin: "50px auto 0",
        justifySelf: "center",
      }}
    >
      <Typography component="p" textAlign="center" fontSize="1.5rem">
        Log in to your account
      </Typography>
      <Typography component="p" textAlign="center">
        Don't have an account?{" "}
        <Link to="/signup" style={{ color: "#1976d2", display: "inline" }}>
          Sign up
        </Link>
      </Typography>
      <Box>
        <Input label="Email address" />
        <Input label="Password" />
        <Button variant="contained" fullWidth sx={{ mt: "20px" }}>
          Login
        </Button>
      </Box>
    </Paper>
  </Box>
);
