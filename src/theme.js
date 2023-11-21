// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#a0a695",
    100: "#909c79",
    200: "#8ca162",
    300: "#84a345",
    400: "#7da52d",
    500: "#6da302",
    600: "#527a00",
    700: "#365200",
    800: "#243600",
    900: "#0c1200",
  },
};

// MUI theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark" ? {
                // palette values for dark mode
                primary: {
                    dark: colorTokens.primary[200],
                    main: colorTokens.primary[400],
                    light: colorTokens.primary[800]
                },
                neutral: {
                    dark: colorTokens.grey[100],
                    main: colorTokens.grey[200],
                    mediumMain: colorTokens.grey[300],
                    medium: colorTokens.grey[400],
                    light: colorTokens.grey[700]
                },
                background: {
                    default: colorTokens.grey[900],
                    alt: colorTokens.grey[800]
                }
            } : {
                // palette values for light mode
                primary: {
                    dark: colorTokens.primary[700],
                    main: colorTokens.primary[400],
                    light: colorTokens.primary[50]
                },
                neutral: {
                    dark: colorTokens.grey[700],
                    main: colorTokens.grey[500],
                    mediumMain: colorTokens.grey[400],
                    medium: colorTokens.grey[300],
                    light: colorTokens.grey[100]
                },
                background: {
                    default: colorTokens.grey[100],
                    alt: colorTokens.grey[0]
                },
            }),
        },
        typography: {
            fontFamily: ["Rubik", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Rubik", "sans-serif"].join(","),
                fontSize: 14,
            },
        }
    };
};