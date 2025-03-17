import React from "react";
import "./css/App.css";
import Panel from "./components/Panel";
import ApiKeyWarning from "./components/ApiKeyWarning";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <ApiKeyWarning />
        <Panel />
      </div>
    </ThemeProvider>
  );
}

export default App;
