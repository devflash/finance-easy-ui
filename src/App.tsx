import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

type AppProps = {
  children: React.ReactNode;
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#112D4E",
      contrastText: "#ffffff  ",
    },
    secondary: {
      main: "#DBE2EF",
    },
    background: {
      default: "#FAF8F8",
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
