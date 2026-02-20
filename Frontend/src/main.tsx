import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#111827",
    },
    secondary: {
      main: "#2563eb",
    },
    background: {
      default: "#f9fafb",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
)