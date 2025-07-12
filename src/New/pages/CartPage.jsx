"use client"

import { useState } from "react"
import {
  Box,
  Grid,
  Text,
  Badge,
  Button,
  HStack,
  VStack,
  Flex,
  IconButton,
  Input,
  Heading,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react"
import { ArrowLeft, Plus, Minus, Trash2, Tag } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

const CartPage = () => {
  const navigate = useNavigate()
  const { items, updateQuantity, removeFromCart, getTotalItems, getTotalPrice } = useCart()

  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  const bg = useColorModeValue("gray.50", "gray.900")
  const headerBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const cardBg = useColorModeValue("white", "gray.800")

  const applyCoupon = () => {
    if (couponCode === "SAVE20") {
      setAppliedCoupon({ code: couponCode, discount: 20 })
    } else if (couponCode === "FIRST10") {
      setAppliedCoupon({ code: couponCode, discount: 10 })
    } else {
      alert("Invalid coupon code")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
  }

  const subtotal = getTotalPrice()
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const gst = (subtotal - discount) * 0.18
  const total = subtotal - discount + gst

  if (items.length === 0) {
    return (
      <Box minH="100vh" bg={bg} display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={6}>
          <Heading size="xl">Your cart is empty</Heading>
          <Text color="gray.600">Add some delicious items to get started</Text>
          <Button colorScheme="orange" onClick={() => navigate("/")}>
            Browse Restaurants
          </Button>
        </VStack>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg={bg}>
      {/* Header */}
      <Box bg={headerBg} shadow="sm" borderBottom="1px" borderColor={borderColor} position="sticky" top={0} zIndex={40}>
        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
          <Flex align="center" justify="space-between" h="16">
            <HStack spacing={4}>
              <IconButton
                aria-label="Go back"
                icon={<ArrowLeft size={20} />}
                variant="ghost"
                onClick={() => navigate("/restaurant/1")}
              />
              <Heading size="lg">Your Cart</Heading>
            </HStack>
          </Flex>
        </Box>
      </Box>

      <Box maxW="4xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }} py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Cart Items */}
          <VStack spacing={4} align="stretch">
            <Box bg={cardBg} p={6} borderRadius="lg" shadow="sm">
              <Heading size="md" mb={4}>
                Order Items ({items.length})
              </Heading>
              <VStack spacing={4}>
                {items.map((item, index) => (
                  <Flex
                    key={`${item.id}-${index}`}
                    align="center"
                    p={4}
                    border="1px"
                    borderColor={borderColor}
                    borderRadius="lg"
                    w="full"
                  >
                    <Box w={3} h={3} borderRadius="full" bg={item.isVeg ? "green.500" : "red.500"} mr={4} />

                    <VStack align="start" flex={1} spacing={1}>
                      <Text fontWeight="semibold">{item.name}</Text>
                      <Text fontSize="sm" color="gray.600">
                        ₹{item.price}
                      </Text>
                      {item.specialInstructions && (
                        <Text fontSize="sm" color="blue.600">
                          Note: {item.specialInstructions}
                        </Text>
                      )}
                    </VStack>

                    <HStack spacing={2}>
                      <IconButton
                        aria-label="Decrease quantity"
                        icon={<Minus size={16} />}
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.specialInstructions, item.quantity - 1)}
                      />
                      <Text fontWeight="semibold" minW="8" textAlign="center">
                        {item.quantity}
                      </Text>
                      <IconButton
                        aria-label="Increase quantity"
                        icon={<Plus size={16} />}
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.specialInstructions, item.quantity + 1)}
                      />
                    </HStack>

                    <VStack align="end" ml={4}>
                      <Text fontWeight="semibold">₹{item.price * item.quantity}</Text>
                      <IconButton
                        aria-label="Remove item"
                        icon={<Trash2 size={16} />}
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => removeFromCart(item.id, item.specialInstructions)}
                      />
                    </VStack>
                  </Flex>
                ))}
              </VStack>
            </Box>

            {/* Coupon Section */}
            <Box bg={cardBg} p={6} borderRadius="lg" shadow="sm">
              <HStack spacing={2} mb={4}>
                <Tag size={20} />
                <Heading size="md">Apply Coupon</Heading>
              </HStack>

              {appliedCoupon ? (
                <Flex
                  align="center"
                  justify="space-between"
                  p={3}
                  bg="green.50"
                  border="1px"
                  borderColor="green.200"
                  borderRadius="lg"
                >
                  <VStack align="start" spacing={1}>
                    <Badge colorScheme="green">{appliedCoupon.code}</Badge>
                    <Text fontSize="sm" color="green.600">
                      {appliedCoupon.discount}% discount applied
                    </Text>
                  </VStack>
                  <Button variant="ghost" size="sm" onClick={removeCoupon}>
                    Remove
                  </Button>
                </Flex>
              ) : (
                <HStack spacing={2}>
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button onClick={applyCoupon}>Apply</Button>
                </HStack>
              )}

              <VStack align="start" mt={4} spacing={2}>
                <Text fontSize="sm" color="gray.600">
                  Available coupons:
                </Text>
                <HStack spacing={2}>
                  <Badge variant="outline" cursor="pointer" onClick={() => setCouponCode("SAVE20")}>
                    SAVE20 - 20% OFF
                  </Badge>
                  <Badge variant="outline" cursor="pointer" onClick={() => setCouponCode("FIRST10")}>
                    FIRST10 - 10% OFF
                  </Badge>
                </HStack>
              </VStack>
            </Box>
          </VStack>

          {/* Order Summary */}
          <VStack spacing={4} align="stretch">
            <Box bg={cardBg} p={6} borderRadius="lg" shadow="sm">
              <Heading size="md" mb={4}>
                Order Summary
              </Heading>
              <VStack spacing={4}>
                <VStack spacing={2} w="full">
                  <Flex justify="space-between" w="full">
                    <Text>Subtotal</Text>
                    <Text>₹{subtotal}</Text>
                  </Flex>

                  {appliedCoupon && (
                    <Flex justify="space-between" w="full" color="green.600">
                      <Text>Discount ({appliedCoupon.discount}%)</Text>
                      <Text>-₹{discount.toFixed(2)}</Text>
                    </Flex>
                  )}

                  <Flex justify="space-between" w="full">
                    <Text>GST (18%)</Text>
                    <Text>₹{gst.toFixed(2)}</Text>
                  </Flex>

                  <Divider />

                  <Flex justify="space-between" w="full" fontWeight="bold" fontSize="lg">
                    <Text>Total</Text>
                    <Text>₹{total.toFixed(2)}</Text>
                  </Flex>
                </VStack>

                <Button w="full" size="lg" colorScheme="orange" onClick={() => navigate("/checkout")}>
                  Proceed to Checkout
                </Button>
              </VStack>
            </Box>

            {/* Restaurant Info */}
            <Box bg={cardBg} p={4} borderRadius="lg" shadow="sm">
              <Text fontWeight="semibold" mb={2}>
                Spice Garden
              </Text>
              <Text fontSize="sm" color="gray.600">
                123 Food Street, Delhi
              </Text>
              <Text fontSize="sm" color="gray.600">
                Estimated time: 25-30 mins
              </Text>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </Box>
  )
}

export default CartPage
