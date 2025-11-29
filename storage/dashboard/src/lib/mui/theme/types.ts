import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";

declare module "@mui/material/styles" {
  interface Palette {
    surface: {
      lowest: string;
      low: string;
      medium: string;
      high: string;
      highest: string;
    };
  }

  interface PaletteOptions {
    surface?: {
      lowest?: string;
      low?: string;
      medium?: string;
      high?: string;
      highest?: string;
    };
  }

  interface Shape {
    radius: {
      "1": number;
      "2": number;
      "3": number;
      "4": number;
      "5": number;
    };
  }

  interface ShapeOptions {
    radius?: {
      "1"?: number;
      "2"?: number;
      "3"?: number;
      "4"?: number;
      "5"?: number;
    };
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    lowest: true;
    low: true;
    medium: true;
    high: true;
    highest: true;
  }
}
