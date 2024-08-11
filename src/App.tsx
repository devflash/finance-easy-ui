import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type AppProps = {
  children: React.ReactNode;
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#112D4E",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#DBE2EF",
    },
    background: {
      default: "#FAF8F8",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          height: "100%",
          minHeight: "100vh",
        },
        a: {
          display: "block",
          textDecoration: "none",
          color: "#fff",
        },
      },
    },
  },
});

function App({ children }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default App;
