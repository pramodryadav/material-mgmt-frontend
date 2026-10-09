import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Change primary color
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // Custom font
    button: {
      textTransform: "none", // Disable uppercase text on buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Custom button styles
          padding: "10px 20px",
        },
      },
    },
  },
});

export default theme;
