import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    primary: {
      50: "#fff2ee",
      100: "#ffe0d6",
      200: "#ffbfa8",
      300: "#ff9e7a",
      400: "#ff7d4c",
      500: "#ff6b35",
      600: "#e55a2b",
      700: "#cc4921",
      800: "#b33817",
      900: "#99270d",
    },
    secondary: {
      50: "#f7fafc",
      100: "#edf2f7",
      200: "#e2e8f0",
      300: "#cbd5e0",
      400: "#a0aec0",
      500: "#718096",
      600: "#4a5568",
      700: "#2d3748",
      800: "#1a202c",
      900: "#171923",
    },
    accent: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "500",
        borderRadius: "12px",
        transition: "all 0.2s",
      },
      variants: {
        solid: {
          bg: "primary.500",
          color: "white",
          _hover: {
            bg: "primary.600",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          },
          _active: {
            bg: "primary.700",
            transform: "translateY(0)",
          },
        },
        outline: {
          borderColor: "primary.500",
          color: "primary.500",
          _hover: {
            bg: "primary.500",
            color: "white",
            transform: "translateY(-1px)",
          },
        },
        ghost: {
          color: "primary.500",
          _hover: {
            bg: "primary.50",
          },
        },
      },
      sizes: {
        sm: {
          px: 4,
          py: 2,
          fontSize: "sm",
        },
        md: {
          px: 6,
          py: 3,
          fontSize: "md",
        },
        lg: {
          px: 8,
          py: 4,
          fontSize: "lg",
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: "16px",
          boxShadow: "sm",
          border: "1px solid",
          borderColor: "gray.200",
          transition: "all 0.3s",
          _hover: {
            transform: "translateY(-4px)",
            boxShadow: "lg",
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: "500",
        textTransform: "none",
      },
      variants: {
        solid: {
          bg: "primary.500",
          color: "white",
        },
        outline: {
          borderColor: "primary.500",
          color: "primary.500",
        },
        success: {
          bg: "green.100",
          color: "green.800",
        },
        error: {
          bg: "red.100",
          color: "red.800",
        },
        warning: {
          bg: "orange.100",
          color: "orange.800",
        },
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "white" : "gray.800",
      },
    }),
  },
})

export default theme
