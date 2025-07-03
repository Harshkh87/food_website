"use client"

import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Image,
  Badge,
  IconButton,
  Divider,
  useColorModeValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
} from "@chakra-ui/react"
import { AddIcon, MinusIcon, DeleteIcon } from "@chakra-ui/icons"
import { useCart } from "../contexts/CartContext"

const ShoppingCart = () => {
  const { cartItems, isCartOpen, removeFromCart, updateQuantity, clearCart, getCartTotal, toggleCart } = useCart()
  const bgGray50 = useColorModeValue("gray.50", "gray.700")

  const deliveryFee = 29
  const taxes = Math.round(getCartTotal() * 0.05) // 5% tax
  const finalTotal = getCartTotal() + deliveryFee + taxes

  return (
    <Drawer isOpen={isCartOpen} placement="right" onClose={toggleCart} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Heading size="lg">Your Order</Heading>
        </DrawerHeader>

        <DrawerBody>
          {cartItems.length === 0 ? (
            <VStack spacing={6} justify="center" h="full">
              <Text fontSize="4xl">🛒</Text>
              <Heading size="md">Your cart is empty</Heading>
              <Text color="gray.600" textAlign="center">
                Add some delicious items to get started!
              </Text>
            </VStack>
          ) : (
            <VStack spacing={4} align="stretch">
              {cartItems.map((item) => (
                <Box key={item.id} p={4} bg={bgGray50} borderRadius="lg">
                  <HStack spacing={4} align="start">
                    <Box position="relative" w="80px" h="80px" borderRadius="md" overflow="hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                      <Badge position="absolute" top={1} left={1} colorScheme={item.veg ? "green" : "red"} size="sm">
                        {item.veg ? "🟢" : "🔴"}
                      </Badge>
                    </Box>

                    <VStack align="start" spacing={1} flex={1} minW={0}>
                      <Text fontWeight="600" noOfLines={1}>
                        {item.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500" noOfLines={1}>
                        {item.restaurantName}
                      </Text>
                      <Text fontWeight="600" color="primary.500">
                        ₹{item.price}
                      </Text>

                      {item.customizations && Object.keys(item.customizations).length > 0 && (
                        <HStack spacing={1} flexWrap="wrap">
                          {Object.entries(item.customizations).map(([key, value]) => (
                            <Badge key={key} variant="subtle" size="sm">
                              {key}: {value}
                            </Badge>
                          ))}
                        </HStack>
                      )}
                    </VStack>

                    <VStack spacing={2}>
                      <HStack>
                        <IconButton
                          aria-label="Decrease quantity"
                          icon={<MinusIcon />}
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        />
                        <Text minW="30px" textAlign="center" fontWeight="600">
                          {item.quantity}
                        </Text>
                        <IconButton
                          aria-label="Increase quantity"
                          icon={<AddIcon />}
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        />
                      </HStack>

                      <IconButton
                        aria-label="Remove item"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      />
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </DrawerBody>

        {cartItems.length > 0 && (
          <DrawerFooter borderTopWidth="1px" flexDirection="column" p={6}>
            <VStack spacing={4} w="full">
              <VStack spacing={2} w="full">
                <Flex w="full" justify="space-between">
                  <Text>Subtotal</Text>
                  <Text>₹{getCartTotal()}</Text>
                </Flex>
                <Flex w="full" justify="space-between">
                  <Text>Delivery Fee</Text>
                  <Text>₹{deliveryFee}</Text>
                </Flex>
                <Flex w="full" justify="space-between">
                  <Text>Taxes & Fees</Text>
                  <Text>₹{taxes}</Text>
                </Flex>
                <Divider />
                <Flex w="full" justify="space-between" fontWeight="600" fontSize="lg">
                  <Text>Total</Text>
                  <Text>₹{finalTotal}</Text>
                </Flex>
              </VStack>

              <HStack spacing={4} w="full">
                <Button variant="outline" onClick={clearCart} flex={1}>
                  Clear Cart
                </Button>
                <Button colorScheme="primary" flex={2}>
                  Proceed to Checkout
                </Button>
              </HStack>
            </VStack>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export default ShoppingCart
