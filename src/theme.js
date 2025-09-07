import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // MUI default – you can replace with your brand color
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  spacing: 8, // uniform spacing unit
});

export default theme;
