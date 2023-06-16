import { createTheme } from "@mui/material/styles";

export const theme = (mode) => {
  return createTheme({
    palette: {
      mode: mode === "dark" ? "dark" : "light",

      primary: {
        main: "#a696c8",
      },
    },
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 2,
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            background: "#5fc65f",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          color: "success",
          variant: "contained",
        },
      },
      MuiTextField: {
        defaultProps: {
          color: "success",
          variant: "contained",
        },
        styleOverrides: {
          root: {
            background: mode === "light" ? "#e0e0e0" : "#333",
          },
        },
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });
};
