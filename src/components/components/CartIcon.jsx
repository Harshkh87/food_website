"use client"

import { Box, IconButton, Text, Badge as ChakraBadge } from "@chakra-ui/react"
import { useCart } from "../contexts/CartContext"

const CartIcon = () => {
  const { getCartItemsCount, toggleCart } = useCart()
  const itemCount = getCartItemsCount()

  return (
    <Box position="relative">
      <IconButton
        aria-label="Open shopping cart"
        icon={<Text fontSize="xl">🛒</Text>}
        onClick={toggleCart}
        variant="ghost"
        size="lg"
      />
      {itemCount > 0 && (
        <ChakraBadge
          position="absolute"
          top="-1"
          right="-1"
          colorScheme="red"
          borderRadius="full"
          fontSize="xs"
          minW="20px"
          h="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </ChakraBadge>
      )}
    </Box>
  )
}

export default CartIcon
