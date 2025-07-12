"use client"

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  useSteps,
  Divider,
  useColorModeValue,
  useToast,
  Image,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
} from "@chakra-ui/react"
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons"
import { MapPin, Phone, CreditCard, Truck } from "lucide-react"
import { useState } from "react"

const steps = [
  { title: "Order", description: "Your Order" },
  { title: "Details", description: "Your Details" },
  { title: "Summary", description: "Order Summary" },
  { title: "Payment", description: "Payment" },
]

export default function CartCheckout({ cartItems = [], updateCartItem, removeFromCart }) {
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length })
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
    instructions: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  const toast = useToast()
  const cardBg = useColorModeValue("white", "gray.800")

  // Mock cart items if none provided
  const mockCartItems =
    cartItems.length > 0
      ? cartItems
      : [
          {
            id: 1,
            name: "Butter Chicken",
            image: "/placeholder.svg?height=100&width=100",
            price: 320,
            quantity: 2,
            restaurant: "Spice Garden",
          },
          {
            id: 2,
            name: "Margherita Pizza",
            image: "/placeholder.svg?height=100&width=100",
            price: 250,
            quantity: 1,
            restaurant: "Pizza Corner",
          },
          {
            id: 3,
            name: "Quinoa Salad",
            image: "/placeholder.svg?height=100&width=100",
            price: 180,
            quantity: 1,
            restaurant: "Green Leaf Cafe",
          },
        ]

  const [currentCartItems, setCurrentCartItems] = useState(mockCartItems)

  const subtotal = currentCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 500 ? 0 : 50
  const taxes = Math.round(subtotal * 0.18) // 18% GST
  const discount = subtotal > 1000 ? 100 : 0
  const total = subtotal + deliveryFee + taxes - discount

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCurrentCartItems(currentCartItems.filter((item) => item.id !== itemId))
    } else {
      setCurrentCartItems(
        currentCartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)),
      )
    }
  }

  const handleRemoveItem = (itemId) => {
    setCurrentCartItems(currentCartItems.filter((item) => item.id !== itemId))
  }

  const handleDetailsSubmit = () => {
    if (!deliveryDetails.name || !deliveryDetails.email || !deliveryDetails.phone || !deliveryDetails.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }
    setActiveStep(2)
  }

  const handlePayment = () => {
    setIsProcessing(true)
    const newOrderNumber = `ORD${Date.now().toString().slice(-6)}`
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderConfirmed(true)
      setOrderNumber(newOrderNumber)
      setActiveStep(3)
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${newOrderNumber} has been confirmed`,
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }, 2000)
  }

  const handleInputChange = (e) => {
    setDeliveryDetails({
      ...deliveryDetails,
      [e.target.name]: e.target.value,
    })
  }

  if (orderConfirmed) {
    return (
      <Container maxW="4xl" py={8}>
        <VStack spacing={8} textAlign="center">
          <Box color="green.500" fontSize="6xl">
            <CheckIcon />
          </Box>
          <Heading size="xl" color="green.500">
            Thank You for Your Order!
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Your order has been placed successfully and is being prepared.
          </Text>
          <Card bg={cardBg} w="full" maxW="md">
            <CardBody>
              <VStack spacing={4}>
                <Text fontWeight="bold">Order Number: #{orderNumber}</Text>
                <Divider />
                <HStack justify="space-between" w="full">
                  <Text>Total Amount:</Text>
                  <Text fontWeight="semibold">₹{total}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text>Estimated Delivery:</Text>
                  <Text fontWeight="semibold">30-45 minutes</Text>
                </HStack>
                <Text fontSize="sm" color="gray.600" textAlign="center">
                  You will receive order updates via SMS and email
                </Text>
              </VStack>
            </CardBody>
          </Card>
          <HStack spacing={4}>
            <Button colorScheme="orange" onClick={() => (window.location.href = "/")}>
              Continue Shopping
            </Button>
            <Button variant="outline">Track Order</Button>
          </HStack>
        </VStack>
      </Container>
    )
  }

  if (currentCartItems.length === 0) {
    return (
      <Container maxW="4xl" py={8}>
        <VStack spacing={8} textAlign="center">
          <Heading size="xl">Your Cart is Empty</Heading>
          <Text color="gray.600">Add some delicious items to your cart to get started!</Text>
          <Button colorScheme="orange" onClick={() => (window.location.href = "/")}>
            Browse Restaurants
          </Button>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8}>
        <Heading size="xl" textAlign="center">
          Checkout
        </Heading>

        {/* Stepper */}
        <Box w="full" maxW="4xl">
          <Stepper index={activeStep} colorScheme="orange">
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Step Content */}
        <Box w="full">
          {/* Step 1: Your Order */}
          {activeStep === 0 && (
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
              <Box gridColumn={{ base: "1", lg: "1 / 3" }}>
                <Card bg={cardBg}>
                  <CardHeader>
                    <Heading size="lg">Your Order ({currentCartItems.length} items)</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4}>
                      {currentCartItems.map((item) => (
                        <Card key={item.id} variant="outline" w="full">
                          <CardBody>
                            <Flex gap={4} align="center">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                boxSize="80px"
                                objectFit="cover"
                                borderRadius="md"
                              />
                              <VStack align="start" flex={1} spacing={1}>
                                <Heading size="sm">{item.name}</Heading>
                                <Text fontSize="sm" color="gray.600">
                                  {item.restaurant}
                                </Text>
                                <Text fontWeight="bold" color="orange.500">
                                  ₹{item.price}
                                </Text>
                              </VStack>
                              <VStack spacing={2}>
                                <NumberInput
                                  size="sm"
                                  maxW={20}
                                  value={item.quantity}
                                  min={1}
                                  onChange={(valueString) =>
                                    handleQuantityChange(item.id, Number.parseInt(valueString))
                                  }
                                >
                                  <NumberInputField />
                                  <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                  </NumberInputStepper>
                                </NumberInput>
                                <IconButton
                                  aria-label="Remove item"
                                  icon={<DeleteIcon />}
                                  size="sm"
                                  colorScheme="red"
                                  variant="ghost"
                                  onClick={() => handleRemoveItem(item.id)}
                                />
                              </VStack>
                              <Text fontWeight="bold" minW="80px" textAlign="right">
                                ₹{item.price * item.quantity}
                              </Text>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                    </VStack>
                  </CardBody>
                </Card>
              </Box>

              {/* Order Summary Sidebar */}
              <Card bg={cardBg} h="fit-content">
                <CardHeader>
                  <Heading size="md">Order Summary</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={3}>
                    <HStack justify="space-between" w="full">
                      <Text>Subtotal:</Text>
                      <Text>₹{subtotal}</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Delivery Fee:</Text>
                      <Text color={deliveryFee === 0 ? "green.500" : "inherit"}>
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Taxes (GST):</Text>
                      <Text>₹{taxes}</Text>
                    </HStack>
                    {discount > 0 && (
                      <HStack justify="space-between" w="full">
                        <Text>Discount:</Text>
                        <Text color="green.500">-₹{discount}</Text>
                      </HStack>
                    )}
                    <Divider />
                    <HStack justify="space-between" w="full" fontSize="lg" fontWeight="bold">
                      <Text>Total:</Text>
                      <Text color="orange.500">₹{total}</Text>
                    </HStack>
                    <Button colorScheme="orange" w="full" onClick={() => setActiveStep(1)}>
                      Proceed to Checkout
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          )}

          {/* Step 2: Your Details */}
          {activeStep === 1 && (
            <Card bg={cardBg} maxW="2xl" mx="auto">
              <CardHeader>
                <Heading size="lg">Delivery Details</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={6}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                    <FormControl isRequired>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        name="name"
                        value={deliveryDetails.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        name="email"
                        type="email"
                        value={deliveryDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        name="phone"
                        value={deliveryDetails.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>City</FormLabel>
                      <Select
                        name="city"
                        value={deliveryDetails.city}
                        onChange={handleInputChange}
                        placeholder="Select city"
                      >
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired gridColumn={{ base: "1", md: "1 / 3" }}>
                      <FormLabel>Delivery Address</FormLabel>
                      <Textarea
                        name="address"
                        value={deliveryDetails.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete address"
                        rows={3}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Pincode</FormLabel>
                      <Input
                        name="pincode"
                        value={deliveryDetails.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter pincode"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Landmark</FormLabel>
                      <Input
                        name="landmark"
                        value={deliveryDetails.landmark}
                        onChange={handleInputChange}
                        placeholder="Nearby landmark"
                      />
                    </FormControl>
                  </SimpleGrid>
                  <FormControl>
                    <FormLabel>Delivery Instructions</FormLabel>
                    <Textarea
                      name="instructions"
                      value={deliveryDetails.instructions}
                      onChange={handleInputChange}
                      placeholder="Any special instructions for delivery..."
                      rows={3}
                    />
                  </FormControl>
                  <HStack spacing={4} w="full" justify="center">
                    <Button onClick={() => setActiveStep(0)}>Back</Button>
                    <Button colorScheme="orange" onClick={handleDetailsSubmit}>
                      Continue
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Step 3: Order Summary */}
          {activeStep === 2 && (
            <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
              <Box gridColumn={{ base: "1", lg: "1 / 3" }}>
                <VStack spacing={6}>
                  {/* Order Items */}
                  <Card bg={cardBg} w="full">
                    <CardHeader>
                      <Heading size="md">Order Items</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={4}>
                        {currentCartItems.map((item) => (
                          <Flex key={item.id} gap={4} align="center" w="full">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              boxSize="60px"
                              objectFit="cover"
                              borderRadius="md"
                            />
                            <VStack align="start" flex={1} spacing={0}>
                              <Text fontWeight="semibold">{item.name}</Text>
                              <Text fontSize="sm" color="gray.600">
                                {item.restaurant}
                              </Text>
                            </VStack>
                            <Text>Qty: {item.quantity}</Text>
                            <Text fontWeight="bold">₹{item.price * item.quantity}</Text>
                          </Flex>
                        ))}
                      </VStack>
                    </CardBody>
                  </Card>

                  {/* Delivery Details */}
                  <Card bg={cardBg} w="full">
                    <CardHeader>
                      <Heading size="md">Delivery Details</Heading>
                    </CardHeader>
                    <CardBody>
                      <VStack spacing={3} align="start">
                        <HStack>
                          <Text fontWeight="semibold" w="100px">
                            Name:
                          </Text>
                          <Text>{deliveryDetails.name}</Text>
                        </HStack>
                        <HStack>
                          <Phone size={16} />
                          <Text fontWeight="semibold" w="100px">
                            Phone:
                          </Text>
                          <Text>{deliveryDetails.phone}</Text>
                        </HStack>
                        <HStack align="start">
                          <MapPin size={16} />
                          <Text fontWeight="semibold" w="100px">
                            Address:
                          </Text>
                          <Text>
                            {deliveryDetails.address}, {deliveryDetails.city}
                            {deliveryDetails.pincode && ` - ${deliveryDetails.pincode}`}
                          </Text>
                        </HStack>
                        <HStack>
                          <Truck size={16} />
                          <Text fontWeight="semibold" w="100px">
                            Delivery:
                          </Text>
                          <Text>30-45 minutes</Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </Box>

              {/* Final Summary */}
              <Card bg={cardBg} h="fit-content">
                <CardHeader>
                  <Heading size="md">Final Summary</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={3}>
                    <HStack justify="space-between" w="full">
                      <Text>Subtotal:</Text>
                      <Text>₹{subtotal}</Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Delivery Fee:</Text>
                      <Text color={deliveryFee === 0 ? "green.500" : "inherit"}>
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </Text>
                    </HStack>
                    <HStack justify="space-between" w="full">
                      <Text>Taxes (GST):</Text>
                      <Text>₹{taxes}</Text>
                    </HStack>
                    {discount > 0 && (
                      <HStack justify="space-between" w="full">
                        <Text>Discount:</Text>
                        <Text color="green.500">-₹{discount}</Text>
                      </HStack>
                    )}
                    <Divider />
                    <HStack justify="space-between" w="full" fontSize="lg" fontWeight="bold">
                      <Text>Total:</Text>
                      <Text color="orange.500">₹{total}</Text>
                    </HStack>
                    <VStack spacing={3} w="full" mt={4}>
                      <Button onClick={() => setActiveStep(1)} w="full" variant="outline">
                        Back
                      </Button>
                      <Button colorScheme="orange" w="full" onClick={handlePayment} isLoading={isProcessing}>
                        <CreditCard size={16} style={{ marginRight: "8px" }} />
                        Pay ₹{total}
                      </Button>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          )}
        </Box>
      </VStack>
    </Container>
  )
}
