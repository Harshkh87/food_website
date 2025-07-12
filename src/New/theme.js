import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    brand: {
      50: "#fff5f5",
      100: "#fed7d7",
      200: "#feb2b2",
      300: "#fc8181",
      400: "#f56565",
      500: "#e53e3e",
      600: "#c53030",
      700: "#9b2c2c",
      800: "#822727",
      900: "#63171b",
    },
    orange: {
      50: "#fffaf0",
      100: "#feebc8",
      200: "#fbd38d",
      300: "#f6ad55",
      400: "#ed8936",
      500: "#dd6b20",
      600: "#c05621",
      700: "#9c4221",
      800: "#7b341e",
      900: "#652b19",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
})
