import { createTheme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    surface?: {
      lowest?: string;
      low?: string;
      medium?: string;
      high?: string;
      highest?: string;
    };
  }
}

export const themeOptions: ThemeOptions = {
  cssVariables: {
    nativeColor: true,
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#415f91", // Strawberry Milkshake Pink
          light: "#d6e3ff", // Lighter shade for contrast
          dark: "#284777", // Deeper shade for hover/active
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#565f71", // Light Lavender
          light: "#dae2f9", // Lighter shade
          dark: "#3e4759", // Deeper shade
          contrastText: "#ffffff",
        },
        text: {
          primary: "#191c20",
          secondary: "#44474e",
        },
        background: {
          default: "#f9f9ff",
          paper: "#ededf4",
        },
        divider: "#c4c6d0",
        surface: {
          lowest: "#fff",
          low: "#f3f3fa",
          medium: "#ededf4",
          high: "#e7e8ee",
          highest: "#e2e2e9",
        },
      },
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 6,
          fontWeight: "bold",
        },
        sizeMedium: {
          padding: "12px 16px",
        },
        sizeSmall: {
          padding: "6px 12px",
          borderRadius: 9999,
        },
        sizeLarge: {
          padding: "16px 32px",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: 8,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: "none",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: 8,
          minWidth: 250,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
        elevation: 2,
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2,
      },
      styleOverrides: {
        outlined: {
          backgroundColor: "unset",
        },
        elevation0: {
          backgroundColor: "var(--mui-palette-surface-lowest)",
          boxShadow: "none",
        },
        elevation1: {
          backgroundColor: "var(--mui-palette-surface-low)",
          boxShadow: "none",
        },
        elevation2: {
          backgroundColor: "var(--mui-palette-surface-medium)",
          boxShadow: "none",
        },
        elevation3: {
          backgroundColor: "var(--mui-palette-surface-high)",
          boxShadow: "none",
        },
        elevation4: {
          backgroundColor: "var(--mui-palette-surface-highest)",
          boxShadow: "none",
        },
      },
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: "system-ui",
    h1: {
      fontSize: "3.174em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h2: {
      fontSize: "1.961em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h3: {
      fontSize: "1.47em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h4: {
      fontSize: "1.212em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h5: {
      fontSize: "1.101em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    h6: {
      fontSize: "1em",
      fontWeight: 700,
      lineHeight: "revert",
    },
    button: {
      lineHeight: "revert",
      textTransform: "none",
    },
  },
};

export const theme = createTheme(themeOptions);
