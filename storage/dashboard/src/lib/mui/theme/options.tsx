import { createTheme, ThemeOptions } from "@mui/material/styles";

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
          borderRadius: 999,
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
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
        fullWidth: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "var(--mui-palette-background-default)",
          color: "var(--mui-palette-text-primary)",
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
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
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
      defaultProps: {
        slotProps: {
          paper: {
            variant: "elevation",
          },
        },
      },
      styleOverrides: {
        paper: {
          marginTop: 8,
          minWidth: 250,
        },
        list: {
          marginLeft: 8,
          marginRight: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "unset",
          marginRight: 8,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        variant: "outlined",
        elevation: 2,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: 16,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "medium",
      },
      styleOverrides: {
        outlined: {
          backgroundColor: "unset",
        },
        root: {
          variants: [
            {
              props: { variant: "lowest" },
              style: {
                backgroundColor: "var(--mui-palette-surface-lowest)",
              },
            },
            {
              props: { variant: "low" },
              style: {
                backgroundColor: "var(--mui-palette-surface-low)",
              },
            },
            {
              props: { variant: "medium" },
              style: {
                backgroundColor: "var(--mui-palette-surface-medium)",
              },
            },
            {
              props: { variant: "high" },
              style: {
                backgroundColor: "var(--mui-palette-surface-high)",
              },
            },
            {
              props: { variant: "highest" },
              style: {
                backgroundColor: "var(--mui-palette-surface-highest)",
              },
            },
          ],
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: "var(--mui-shape-radius-4)",
          padding: "0 var(--mui-spacing)",
        },
        row: {
          borderRadius: "var(--mui-shape-radius-3)",
        },
        cell: {
          borderTop: "none",
          borderRadius: "inherit",
        },
        menu: {
          "& .MuiPaper-root": {
            boxShadow: "var(--mui-shadows-6)",
            borderRadius: "var(--mui-shape-radius-4)",
          },
          "& .MuiMenuItem-root": {
            borderRadius: "var(--mui-shape-radius-3)",
          },
          "& .MuiList-root": {
            paddingLeft: 6,
            paddingRight: 6,
          },
        },
        panelContent: {
          borderRadius: "var(--mui-shape-radius-3)",
        },
        columnsManagementFooter: {
          borderTop: "unset",

          "& > label": {
            borderRadius: 999,
            paddingRight: "var(--mui-spacing)",
            ":hover": {
              backgroundColor: "var(--mui-palette-surface-highest)",
            },
          },
        },
        columnsManagementHeader: {
          borderBottom: "unset",
        },
        columnsManagementRow: {
          borderRadius: "var(--mui-shape-radius-2)",
          ":hover": {
            backgroundColor: "var(--mui-palette-surface-highest)",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: 8,
          "@media (min-width: 600px)": {
            padding: 16,
          },
        },
      },
    },
    MuiDateField: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },
  },
  shape: {
    borderRadius: 6,
    radius: {
      "1": 4,
      "2": 6,
      "3": 10,
      "4": 16,
      "5": 26,
    },
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
