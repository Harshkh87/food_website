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
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@chakra-ui/react"
import { ArrowLeft, Smartphone, Banknote, Download, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCart()

  const [orderType, setOrderType] = useState("pickup")
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    guests: 1,
  })
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const subtotal = getTotalPrice()
  const discount = subtotal * 0.1 // 10% discount
  const gst = (subtotal - discount) * 0.18
  const total = subtotal - discount + gst

  const handlePlaceOrder = () => {
    if (paymentMethod === "online") {
      // Simulate online payment
      setTimeout(() => {
        setPaymentSuccess(true)
        setOrderPlaced(true)
        clearCart()
      }, 2000)
    } else {
      // Counter payment
      setOrderPlaced(true)
      clearCart()
    }
  }

  if (orderPlaced) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Box maxW="md" w="full" mx={4} bg="white" p={8} borderRadius="lg" shadow="lg" textAlign="center">
          <CheckCircle size={64} color="green" style={{ margin: "0 auto 16px" }} />
          <Heading size="xl" mb={4}>
            Order Placed Successfully!
          </Heading>

          {paymentMethod === "online" && paymentSuccess ? (
            <VStack spacing={4}>
              <Badge colorScheme="green">Payment Successful</Badge>
              <Text color="gray.600">Your payment has been processed successfully.</Text>
              <Button leftIcon={<Download size={16} />} w="full">
                Download Invoice
              </Button>
            </VStack>
          ) : (
            <VStack spacing={4}>
              <Badge colorScheme="orange">Counter Payment</Badge>
              <Text color="gray.600">Please pay ₹{total.toFixed(2)} at the counter.</Text>
              <Box bg="gray.50" p={4} borderRadius="lg">
                <Text fontWeight="semibold">Order ID: #ORD12345</Text>
                <Text fontSize="sm" color="gray.600">
                  Show this to the cashier
                </Text>
              </Box>
            </VStack>
          )}

          <VStack mt={6} spacing={2}>
            <Text fontSize="sm" color="gray.600">
              {orderType === "pickup" ? "Ready for pickup in 25-30 mins" : "Table will be ready in 10 mins"}
            </Text>
            <Button variant="outline" w="full" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </VStack>
        </Box>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200" position="sticky" top={0} zIndex={40}>
        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
          <Flex align="center" justify="space-between" h="16">
            <HStack spacing={4}>
              <IconButton
                aria-label="Go back"
                icon={<ArrowLeft size={20} />}
                variant="ghost"
                onClick={() => navigate("/cart")}
              />
              <Heading size="lg">Checkout</Heading>
            </HStack>
          </Flex>
        </Box>
      </Box>

      <Box maxW="4xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }} py={8}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Checkout Form */}
          <VStack spacing={6} align="stretch">
            {/* Order Type Selection */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
              <Heading size="md" mb={4}>
                Order Type
              </Heading>
              <RadioGroup value={orderType} onChange={setOrderType}>
                <VStack align="start" spacing={2}>
                  <Radio value="pickup">Pickup (Self Collection)</Radio>
                  <Radio value="dine-in">Dine-in (Eat at Restaurant)</Radio>
                </VStack>
              </RadioGroup>
            </Box>

            {/* Customer Information */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
              <Heading size="md" mb={4}>
                Customer Information
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    placeholder="Enter your name"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="+91 9876543210"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <Input
                    value={customerInfo.whatsapp}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, whatsapp: e.target.value })}
                    placeholder="+91 9876543210"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </FormControl>
                {orderType === "dine-in" && (
                  <FormControl>
                    <FormLabel>Number of Guests</FormLabel>
                    <Input
                      type="number"
                      min="1"
                      value={customerInfo.guests}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, guests: Number.parseInt(e.target.value) })}
                    />
                  </FormControl>
                )}
              </Grid>
            </Box>

            {/* Payment Method */}
            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
              <Heading size="md" mb={4}>
                Payment Method
              </Heading>
              <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                <VStack align="start" spacing={3}>
                  <Box p={3} border="1px" borderColor="gray.200" borderRadius="lg" w="full">
                    <HStack>
                      <Radio value="online" />
                      <Smartphone size={20} />
                      <Text>Online Payment (UPI/Card)</Text>
                    </HStack>
                  </Box>
                  <Box p={3} border="1px" borderColor="gray.200" borderRadius="lg" w="full">
                    <HStack>
                      <Radio value="counter" />
                      <Banknote size={20} />
                      <Text>Pay at Counter (Cash)</Text>
                    </HStack>
                  </Box>
                </VStack>
              </RadioGroup>

              {paymentMethod === "online" && (
                <Box mt={4} p={4} bg="blue.50" border="1px" borderColor="blue.200" borderRadius="lg">
                  <Text fontSize="sm" color="blue.800">
                    You will be redirected to secure payment gateway after placing order.
                  </Text>
                </Box>
              )}

              {paymentMethod === "counter" && (
                <Box mt={4} p={4} bg="orange.50" border="1px" borderColor="orange.200" borderRadius="lg">
                  <Text fontSize="sm" color="orange.800">
                    Please pay ₹{total.toFixed(2)} at the restaurant counter when you arrive.
                  </Text>
                </Box>
              )}
            </Box>
          </VStack>

          {/* Order Summary */}
          <VStack spacing={4} align="stretch">
            <Box bg="white" p={6} borderRadius="lg" shadow="sm">
              <Heading size="md" mb={4}>
                Order Summary
              </Heading>

              {/* Items */}
              <VStack spacing={3} mb={4}>
                {items.map((item, index) => (
                  <VStack key={`${item.id}-${index}`} align="start" spacing={1} w="full">
                    <Flex justify="space-between" w="full">
                      <Text fontWeight="medium">
                        {item.name} x{item.quantity}
                      </Text>
                      <Text>₹{item.price * item.quantity}</Text>
                    </Flex>
                    {item.specialInstructions && (
                      <Text fontSize="xs" color="blue.600">
                        Note: {item.specialInstructions}
                      </Text>
                    )}
                  </VStack>
                ))}
              </VStack>

              <Divider mb={4} />

              {/* Pricing */}
              <VStack spacing={2}>
                <Flex justify="space-between" w="full">
                  <Text>Subtotal</Text>
                  <Text>₹{subtotal}</Text>
                </Flex>
                <Flex justify="space-between" w="full" color="green.600">
                  <Text>Discount (10%)</Text>
                  <Text>-₹{discount.toFixed(2)}</Text>
                </Flex>
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

              <Button
                w="full"
                size="lg"
                colorScheme="orange"
                mt={4}
                onClick={handlePlaceOrder}
                isDisabled={!customerInfo.name || !customerInfo.phone}
              >
                {paymentMethod === "online" ? "Pay Now" : "Place Order"}
              </Button>
            </Box>

            {/* Restaurant Info */}
            <Box bg="white" p={4} borderRadius="lg" shadow="sm">
              <Text fontWeight="semibold" mb={2}>
                Spice Garden
              </Text>
              <Text fontSize="sm" color="gray.600">
                123 Food Street, Delhi
              </Text>
              <Text fontSize="sm" color="gray.600">
                Phone: +91 9876543210
              </Text>
              <Text fontSize="sm" color="gray.600">
                {orderType === "pickup" ? "Ready in: 25-30 mins" : "Table ready in: 10 mins"}
              </Text>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </Box>
  )
}

export default CheckoutPage
