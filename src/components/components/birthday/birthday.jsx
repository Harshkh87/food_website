"use client"

import { useState, useEffect, useRef } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  Image,
  Input,
  Textarea,
  Select,
  Radio,
  RadioGroup,
  Stack,
  Badge,
  useToast,
  Progress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
  HStack,
  Card,
  CardBody,
  useColorModeValue,
  FormControl,
  FormLabel,
  SimpleGrid,
} from "@chakra-ui/react"
import { ArrowBackIcon, ArrowForwardIcon, CheckIcon, CloseIcon, DownloadIcon } from "@chakra-ui/icons"

const BirthdayPartyBooking = ({ restaurant, onClose }) => {
  // State for current step
  const [currentStep, setCurrentStep] = useState(1)

  // State for selected package
  const [selectedPackage, setSelectedPackage] = useState({
    id: "",
    title: "",
    price: 0,
  })

  // State for form data
  const [formData, setFormData] = useState({
    eventDate: new Date().toISOString().split("T")[0],
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    venueAddress: "",
    birthdayPerson: "",
    birthdayAge: "",
    guestsCount: "",
    specialRequests: "",
    cakeOption: "own",
  })

  // State for cake selection
  const [cakeSelection, setCakeSelection] = useState({
    name: "",
    price: 0,
    size: "1",
    sizeMultiplier: 1,
    flavor: "none",
    flavorPrice: 0,
    message: "",
  })

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState("upi")

  // State for total amount
  const [totalAmount, setTotalAmount] = useState(0)

  // State for confirmation timer
  const [timeLeft, setTimeLeft] = useState(15)
  const timerRef = useRef(null)

  // State for booking ID
  const [bookingId, setBookingId] = useState("")

  // Toast for notifications
  const toast = useToast()

  // Modal for confirmation
  const { isOpen, onOpen, onClose: closeConfirmation } = useDisclosure()

  // Color mode values
  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")
  const textColor = useColorModeValue("gray.800", "white")
  const mutedColor = useColorModeValue("gray.600", "gray.400")

  // Package data
  const packages = [
    {
      id: "basic",
      title: "Basic Celebration",
      price: 999,
      description: "Perfect for small gatherings with essential decorations",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "deluxe",
      title: "Deluxe Party",
      price: 2499,
      description: "Our most popular package with premium decorations",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "premium",
      title: "Premium Celebration",
      price: 4999,
      description: "Luxury decorations for an unforgettable birthday experience",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "kids",
      title: "Kids Fantasy",
      price: 1999,
      description: "Themed decorations perfect for children's birthday parties",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "elegant",
      title: "Elegant Soirée",
      price: 3999,
      description: "Sophisticated decorations for adult birthday celebrations",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "budget",
      title: "Budget Friendly",
      price: 699,
      description: "Simple yet beautiful decorations for those on a budget",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  // Cake options data
  const cakeOptions = [
    {
      name: "Chocolate Truffle",
      price: 800,
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      name: "Vanilla Buttercream",
      price: 700,
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      name: "Red Velvet",
      price: 900,
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      name: "Black Forest",
      price: 850,
      image: "/placeholder.svg?height=150&width=200",
    },
  ]

  // Flavor options data
  const flavorOptions = [
    { value: "none", label: "No additional flavor", price: 0 },
    { value: "fruit", label: "Fresh Fruit Topping", price: 200 },
    { value: "nuts", label: "Nuts and Caramel", price: 150 },
    { value: "chocolate", label: "Extra Chocolate Ganache", price: 100 },
  ]

  // Calculate total amount
  useEffect(() => {
    let total = selectedPackage.price
    if (formData.cakeOption === "order" && cakeSelection.name) {
      const adjustedCakePrice = cakeSelection.price * cakeSelection.sizeMultiplier
      total += adjustedCakePrice + cakeSelection.flavorPrice
    }
    setTotalAmount(total)
  }, [selectedPackage, formData.cakeOption, cakeSelection])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle cake option change
  const handleCakeOptionChange = (value) => {
    setFormData({
      ...formData,
      cakeOption: value,
    })
  }

  // Handle cake selection
  const handleCakeSelection = (cake) => {
    setCakeSelection({
      ...cakeSelection,
      name: cake.name,
      price: cake.price,
    })
  }

  // Handle cake size change
  const handleCakeSizeChange = (e) => {
    const size = e.target.value
    setCakeSelection({
      ...cakeSelection,
      size,
      sizeMultiplier: Number.parseFloat(size),
    })
  }

  // Handle cake flavor change
  const handleCakeFlavorChange = (e) => {
    const flavor = e.target.value
    const selectedFlavor = flavorOptions.find((option) => option.value === flavor)
    setCakeSelection({
      ...cakeSelection,
      flavor,
      flavorPrice: selectedFlavor ? selectedFlavor.price : 0,
    })
  }

  // Handle cake message change
  const handleCakeMessageChange = (e) => {
    setCakeSelection({
      ...cakeSelection,
      message: e.target.value,
    })
  }

  // Validate user details form
  const validateUserDetailsForm = () => {
    const requiredFields = [
      { field: "eventDate", message: "Please select an event date" },
      { field: "customerName", message: "Please enter your name" },
      { field: "customerPhone", message: "Please enter your phone number" },
      { field: "customerEmail", message: "Please enter your email address" },
      { field: "venueAddress", message: "Please enter the venue address" },
      { field: "birthdayPerson", message: "Please enter the birthday person's name" },
      { field: "birthdayAge", message: "Please enter the birthday person's age" },
      { field: "guestsCount", message: "Please enter the number of guests" },
    ]

    for (const { field, message } of requiredFields) {
      if (!formData[field]) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
        return false
      }
    }

    if (formData.cakeOption === "order" && !cakeSelection.name) {
      toast({
        title: "Error",
        description: "Please select a cake design",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return false
    }

    return true
  }

  // Start confirmation timer
  const startConfirmationTimer = () => {
    setTimeLeft(15)
    onOpen()
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current)
          confirmOrder()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
  }

  // Confirm order
  const confirmOrder = () => {
    closeConfirmation()
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    const newBookingId = `BD${Math.floor(100000 + Math.random() * 900000)}`
    setBookingId(newBookingId)
    setCurrentStep(5)
  }

  // Cancel confirmation
  const cancelConfirmation = () => {
    closeConfirmation()
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Download receipt
  const downloadReceipt = () => {
    toast({
      title: "Success",
      description: "Receipt downloaded successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  // Reset form and go to home
  const goToHome = () => {
    onClose()
  }

  // Render progress steps
  const renderProgressSteps = () => {
    return (
      <Box maxW="600px" mx="auto" my={8} position="relative">
        <Flex justify="space-between" position="relative" zIndex={2}>
          {[
            { number: 1, name: "Package Selection" },
            { number: 2, name: "Your Details" },
            { number: 3, name: "Order Summary" },
            { number: 4, name: "Payment" },
          ].map((step) => (
            <Flex key={step.number} direction="column" align="center" width="25%" position="relative">
              <Flex
                w="40px"
                h="40px"
                borderRadius="50%"
                bg={currentStep > step.number ? "green.500" : currentStep === step.number ? "primary.500" : "gray.200"}
                color={currentStep >= step.number ? "white" : "gray.600"}
                align="center"
                justify="center"
                fontWeight="600"
                mb={2}
                position="relative"
                zIndex={2}
              >
                {currentStep > step.number ? <CheckIcon /> : step.number}
              </Flex>
              <Text
                fontSize="sm"
                color={currentStep === step.number ? "primary.500" : mutedColor}
                fontWeight={currentStep === step.number ? "600" : "500"}
                textAlign="center"
              >
                {step.name}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Box position="absolute" top="20px" left="0" width="100%" height="4px" bg="gray.200" zIndex={1}>
          <Box
            position="absolute"
            top="0"
            left="0"
            height="100%"
            width={`${((currentStep - 1) / 3) * 100}%`}
            bg="primary.500"
            transition="width 0.5s ease"
          />
        </Box>
      </Box>
    )
  }

  // Render package selection step
  const renderPackageSelection = () => {
    return (
      <Card bg={cardBg}>
        <Box
          bgGradient="linear(135deg, primary.500, accent.500)"
          color="white"
          p={6}
          textAlign="center"
          borderTopRadius="md"
        >
          <Heading as="h2" size="lg" mb={2}>
            🎉 Choose Your Package
          </Heading>
          <Text>Select a decoration package for your birthday party at {restaurant.name}</Text>
        </Box>
        <CardBody p={6}>
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading as="h3" size="md" color="primary.500" mb={6}>
                Birthday Party Decoration Packages
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {packages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    cursor="pointer"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: "translateY(-4px)",
                      boxShadow: "xl",
                    }}
                    borderColor={selectedPackage.id === pkg.id ? "primary.500" : borderColor}
                    borderWidth={selectedPackage.id === pkg.id ? "2px" : "1px"}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    <Box position="relative" h="160px" overflow="hidden">
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.title}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        borderTopRadius="md"
                      />
                      {pkg.popular && (
                        <Badge position="absolute" top={2} right={2} colorScheme="orange" variant="solid">
                          Most Popular
                        </Badge>
                      )}
                    </Box>
                    <CardBody>
                      <VStack align="start" spacing={2}>
                        <Heading size="sm">{pkg.title}</Heading>
                        <Text fontSize="sm" color={mutedColor} noOfLines={2}>
                          {pkg.description}
                        </Text>
                        <Text fontSize="xl" fontWeight="700" color="primary.500">
                          ₹{pkg.price}
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
            <Button
              colorScheme="primary"
              size="lg"
              rightIcon={<ArrowForwardIcon />}
              isDisabled={!selectedPackage.id}
              onClick={() => setCurrentStep(2)}
            >
              Continue to Your Details
            </Button>
          </VStack>
        </CardBody>
      </Card>
    )
  }

  // Render user details step
  const renderUserDetails = () => {
    return (
      <Card bg={cardBg}>
        <Box
          bgGradient="linear(135deg, primary.500, accent.500)"
          color="white"
          p={6}
          textAlign="center"
          borderTopRadius="md"
          position="relative"
        >
          <Button
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            variant="ghost"
            color="white"
            onClick={() => setCurrentStep(1)}
          >
            <ArrowBackIcon />
          </Button>
          <Heading as="h2" size="lg" mb={2}>
            📝 Your Details
          </Heading>
          <Text>Tell us about yourself and the birthday celebration</Text>
        </Box>
        <CardBody p={6}>
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading size="md" color="primary.500" mb={4}>
                Selected Package
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel>Package</FormLabel>
                  <Input value={selectedPackage.title} readOnly bg="gray.50" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Event Date</FormLabel>
                  <Input
                    name="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </FormControl>
              </SimpleGrid>
            </Box>

            <Box>
              <Heading size="md" color="primary.500" mb={4}>
                Your Information
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Your Name</FormLabel>
                  <Input name="customerName" value={formData.customerName} onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input name="customerPhone" type="tel" value={formData.customerPhone} onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email Address</FormLabel>
                  <Input
                    name="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </SimpleGrid>
              <FormControl isRequired mt={4}>
                <FormLabel>Venue Address</FormLabel>
                <Textarea name="venueAddress" value={formData.venueAddress} onChange={handleInputChange} rows={3} />
              </FormControl>
            </Box>

            <Box>
              <Heading size="md" color="primary.500" mb={4}>
                Birthday Person Details
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Birthday Person's Name</FormLabel>
                  <Input name="birthdayPerson" value={formData.birthdayPerson} onChange={handleInputChange} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Age (Turning)</FormLabel>
                  <Input
                    name="birthdayAge"
                    type="number"
                    min={1}
                    max={100}
                    value={formData.birthdayAge}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Number of Guests</FormLabel>
                  <Input
                    name="guestsCount"
                    type="number"
                    min={5}
                    max={200}
                    value={formData.guestsCount}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </SimpleGrid>
            </Box>

            <Box>
              <Heading size="md" color="primary.500" mb={4}>
                Cake Options
              </Heading>
              <RadioGroup onChange={handleCakeOptionChange} value={formData.cakeOption} mb={4}>
                <Stack direction={{ base: "column", md: "row" }} spacing={6}>
                  <Radio value="own">I'll bring my own cake</Radio>
                  <Radio value="order">I want to order a cake</Radio>
                </Stack>
              </RadioGroup>

              {formData.cakeOption === "order" && (
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Text fontWeight="500" mb={3}>
                      Select Cake Design
                    </Text>
                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                      {cakeOptions.map((cake) => (
                        <Card
                          key={cake.name}
                          cursor="pointer"
                          transition="all 0.3s ease"
                          borderColor={cakeSelection.name === cake.name ? "primary.500" : borderColor}
                          borderWidth={cakeSelection.name === cake.name ? "2px" : "1px"}
                          _hover={{
                            borderColor: "primary.500",
                            transform: "translateY(-2px)",
                          }}
                          onClick={() => handleCakeSelection(cake)}
                        >
                          <Image
                            src={cake.image || "/placeholder.svg"}
                            alt={cake.name}
                            w="100%"
                            h="100px"
                            objectFit="cover"
                            borderTopRadius="md"
                          />
                          <CardBody p={3} textAlign="center">
                            <Text fontWeight="600" fontSize="sm" mb={1}>
                              {cake.name}
                            </Text>
                            <Text color="primary.500" fontSize="sm" fontWeight="500">
                              ₹{cake.price}
                            </Text>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </Box>

                  <FormControl>
                    <FormLabel>Message on Cake</FormLabel>
                    <Input
                      placeholder="e.g., Happy Birthday Riya!"
                      value={cakeSelection.message}
                      onChange={handleCakeMessageChange}
                    />
                  </FormControl>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel>Cake Size</FormLabel>
                      <Select value={cakeSelection.size} onChange={handleCakeSizeChange}>
                        <option value="0.5">0.5 kg (serves 4-6)</option>
                        <option value="1">1 kg (serves 8-10)</option>
                        <option value="1.5">1.5 kg (serves 12-15)</option>
                        <option value="2">2 kg (serves 16-20)</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Additional Flavor</FormLabel>
                      <Select value={cakeSelection.flavor} onChange={handleCakeFlavorChange}>
                        {flavorOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                            {option.price > 0 && ` (+₹${option.price})`}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </SimpleGrid>
                </VStack>
              )}
            </Box>

            <FormControl>
              <FormLabel>Special Requests</FormLabel>
              <Textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Any special requests or additional details for your party..."
                rows={4}
              />
            </FormControl>

            <Button
              colorScheme="primary"
              size="lg"
              rightIcon={<ArrowForwardIcon />}
              onClick={() => {
                if (validateUserDetailsForm()) {
                  setCurrentStep(3)
                }
              }}
            >
              Continue to Order Summary
            </Button>
          </VStack>
        </CardBody>
      </Card>
    )
  }

  // Render order summary step
  const renderOrderSummary = () => {
    return (
      <Card bg={cardBg}>
        <Box
          bgGradient="linear(135deg, primary.500, accent.500)"
          color="white"
          p={6}
          textAlign="center"
          borderTopRadius="md"
          position="relative"
        >
          <Button
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            variant="ghost"
            color="white"
            onClick={() => setCurrentStep(2)}
          >
            <ArrowBackIcon />
          </Button>
          <Heading as="h2" size="lg" mb={2}>
            📋 Order Summary
          </Heading>
          <Text>Review your order details</Text>
        </Box>
        <CardBody p={6}>
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading size="md" color="primary.500" mb={4}>
                Your Details
              </Heading>
              <VStack spacing={3} align="stretch">
                {[
                  { label: "Name", value: formData.customerName },
                  { label: "Phone", value: formData.customerPhone },
                  { label: "Email", value: formData.customerEmail },
                  { label: "Venue", value: formData.venueAddress },
                  {
                    label: "Event Date",
                    value: formData.eventDate ? new Date(formData.eventDate).toLocaleDateString() : "-",
                  },
                  { label: "Birthday Person", value: formData.birthdayPerson },
                  { label: "Age", value: formData.birthdayAge },
                  { label: "Number of Guests", value: formData.guestsCount },
                ].map((item) => (
                  <Flex key={item.label} justify="space-between" py={2} borderBottom="1px" borderColor={borderColor}>
                    <Text color={mutedColor}>{item.label}:</Text>
                    <Text fontWeight="500">{item.value || "-"}</Text>
                  </Flex>
                ))}
              </VStack>
            </Box>

            <Box>
              <Heading size="md" color="primary.500" mb={4}>
                Order Details
              </Heading>
              <VStack spacing={3} align="stretch">
                <Flex justify="space-between" py={2} borderBottom="1px" borderColor={borderColor}>
                  <Text color={mutedColor}>Selected Package:</Text>
                  <Text fontWeight="500">{selectedPackage.title}</Text>
                </Flex>
                <Flex justify="space-between" py={2} borderBottom="1px" borderColor={borderColor}>
                  <Text color={mutedColor}>Package Price:</Text>
                  <Text fontWeight="500">₹{selectedPackage.price}</Text>
                </Flex>

                {formData.cakeOption === "order" && cakeSelection.name && (
                  <>
                    <Flex justify="space-between" py={2} borderBottom="1px" borderColor={borderColor}>
                      <Text color={mutedColor}>Cake ({cakeSelection.name}):</Text>
                      <Text fontWeight="500">₹{cakeSelection.price}</Text>
                    </Flex>
                    {cakeSelection.sizeMultiplier !== 1 && (
                      <Flex justify="space-between" py={2} borderBottom="1px" borderColor={borderColor}>
                        <Text color={mutedColor}>Cake Size Adjustment:</Text>
                        <Text fontWeight="500">
                          ₹{cakeSelection.price * cakeSelection.sizeMultiplier - cakeSelection.price}
                        </Text>
                      </Flex>
                    )}
                    {cakeSelection.flavorPrice > 0 && (
                      <Flex justify="space-between" py={2} borderBottom="1px" borderColor={borderColor}>
                        <Text color={mutedColor}>Additional Flavor:</Text>
                        <Text fontWeight="500">₹{cakeSelection.flavorPrice}</Text>
                      </Flex>
                    )}
                  </>
                )}

                <Flex
                  justify="space-between"
                  py={4}
                  mt={4}
                  borderTop="2px"
                  borderColor="primary.500"
                  fontSize="xl"
                  fontWeight="700"
                  color="primary.500"
                >
                  <Text>Total Amount:</Text>
                  <Text>₹{totalAmount}</Text>
                </Flex>
              </VStack>
            </Box>

            <Button colorScheme="primary" size="lg" rightIcon={<ArrowForwardIcon />} onClick={() => setCurrentStep(4)}>
              Proceed to Payment
            </Button>
          </VStack>
        </CardBody>
      </Card>
    )
  }

  // Render payment methods step
  const renderPaymentMethods = () => {
    return (
      <Card bg={cardBg}>
        <Box
          bgGradient="linear(135deg, primary.500, accent.500)"
          color="white"
          p={6}
          textAlign="center"
          borderTopRadius="md"
          position="relative"
        >
          <Button
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            variant="ghost"
            color="white"
            onClick={() => setCurrentStep(3)}
          >
            <ArrowBackIcon />
          </Button>
          <Heading as="h2" size="lg" mb={2}>
            💳 Payment Method
          </Heading>
          <Text>Choose how you want to pay</Text>
        </Box>
        <CardBody p={6}>
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading size="md" color="primary.500" mb={4}>
                Select Payment Method
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {[
                  { id: "upi", name: "UPI Payment", icon: "📱" },
                  { id: "card", name: "Credit/Debit Card", icon: "💳" },
                  { id: "cash", name: "Cash Payment", icon: "💵" },
                  { id: "wallet", name: "Digital Wallet", icon: "👛" },
                ].map((method) => (
                  <Card
                    key={method.id}
                    cursor="pointer"
                    transition="all 0.3s ease"
                    borderColor={paymentMethod === method.id ? "green.500" : borderColor}
                    borderWidth={paymentMethod === method.id ? "2px" : "1px"}
                    bg={paymentMethod === method.id ? "green.50" : cardBg}
                    _hover={{
                      borderColor: "primary.500",
                      transform: "translateY(-2px)",
                    }}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <CardBody>
                      <HStack>
                        <Text fontSize="2xl">{method.icon}</Text>
                        <Text fontWeight="600">{method.name}</Text>
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>

            {paymentMethod === "upi" && (
              <Box textAlign="center" p={6} bg="gray.50" borderRadius="lg" border="2px dashed" borderColor="gray.300">
                <Heading size="md" color="primary.500" mb={4}>
                  Scan QR Code to Pay
                </Heading>
                <Text color={mutedColor} mb={6}>
                  Use any UPI app to scan and complete your payment
                </Text>
                <Box bg="white" p={4} borderRadius="lg" display="inline-block" boxShadow="md" mb={4}>
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${restaurant.name.toLowerCase().replace(/\s+/g, "")}@ybl&pn=${restaurant.name}&am=${totalAmount}&cu=INR&tn=BirthdayPartyBooking`}
                    alt="UPI QR Code"
                    w="200px"
                    h="200px"
                    borderRadius="md"
                  />
                </Box>
                <Text fontWeight="600" color="primary.500" mb={4}>
                  {restaurant.name.toLowerCase().replace(/\s+/g, "")}@ybl
                </Text>
                <Button colorScheme="green" onClick={startConfirmationTimer}>
                  Payment Completed
                </Button>
              </Box>
            )}

            <Box>
              <Heading size="md" color="primary.500" mb={4}>
                Payment Summary
              </Heading>
              <Flex justify="space-between" py={4} fontSize="xl" fontWeight="700" color="primary.500">
                <Text>Total Amount</Text>
                <Text>₹{totalAmount}</Text>
              </Flex>
            </Box>

            <HStack spacing={4}>
              <Button variant="outline" colorScheme="red" flex={1} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" flex={2} onClick={startConfirmationTimer}>
                Make Payment
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    )
  }

  // Render payment success step
  const renderPaymentSuccess = () => {
    return (
      <Card bg={cardBg}>
        <Box
          bgGradient="linear(135deg, green.500, green.600)"
          color="white"
          p={6}
          textAlign="center"
          borderTopRadius="md"
        >
          <Heading as="h2" size="lg" mb={2}>
            ✅ Payment Successful
          </Heading>
          <Text>Your booking has been confirmed</Text>
        </Box>
        <CardBody p={6}>
          <VStack spacing={8} align="center">
            <Text fontSize="6xl">🎉</Text>
            <Heading size="xl" color="green.500" textAlign="center">
              Booking Successful!
            </Heading>
            <Text textAlign="center" color={mutedColor}>
              Your birthday party decoration has been booked successfully at {restaurant.name}!
            </Text>

            <Box bg="gray.50" borderRadius="lg" p={6} w="full">
              <VStack spacing={3} align="stretch">
                {[
                  { label: "Name", value: formData.customerName },
                  { label: "Package", value: selectedPackage.title },
                  {
                    label: "Date",
                    value: formData.eventDate ? new Date(formData.eventDate).toLocaleDateString() : "-",
                  },
                  { label: "Booking ID", value: bookingId },
                  { label: "Amount Paid", value: `₹${totalAmount}` },
                  { label: "Payment Method", value: paymentMethod.toUpperCase() },
                ].map((item) => (
                  <Flex key={item.label} justify="space-between" py={2} borderBottom="1px" borderColor={borderColor}>
                    <Text color={mutedColor}>{item.label}:</Text>
                    <Text fontWeight="600">{item.value}</Text>
                  </Flex>
                ))}
              </VStack>
            </Box>

            <VStack spacing={4}>
              <Button colorScheme="blue" leftIcon={<DownloadIcon />} onClick={downloadReceipt}>
                Download Receipt
              </Button>
              <Button colorScheme="primary" onClick={goToHome}>
                Back to Restaurant
              </Button>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    )
  }

  // Render confirmation modal
  const renderConfirmationModal = () => {
    return (
      <Modal isOpen={isOpen} onClose={cancelConfirmation} isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, 0.7)" />
        <ModalContent borderRadius="xl" maxW="500px">
          <ModalHeader bg="red.500" color="white" p={5} borderTopRadius="xl" textAlign="center">
            <Heading size="lg" mb={1}>
              Confirm Your Order
            </Heading>
            <Text>
              Please confirm your order within{" "}
              <Text as="span" fontWeight="bold">
                {timeLeft}
              </Text>{" "}
              seconds
            </Text>
          </ModalHeader>
          <ModalBody p={8} textAlign="center">
            <VStack spacing={6}>
              <Box position="relative">
                <Progress value={(timeLeft / 15) * 100} h="10px" borderRadius="full" colorScheme="red" mb={2} />
                <Text fontSize="4xl" fontWeight="700" color="red.500">
                  {timeLeft}
                </Text>
              </Box>
              <Text fontSize="lg" color={mutedColor}>
                Your order will be automatically confirmed if no action is taken.
              </Text>
              <Box bg="gray.50" borderRadius="md" p={4} w="full">
                <VStack spacing={2}>
                  <Flex justify="space-between" w="full">
                    <Text color={mutedColor}>Total Amount:</Text>
                    <Text fontWeight="600">₹{totalAmount}</Text>
                  </Flex>
                  <Flex justify="space-between" w="full">
                    <Text color={mutedColor}>Payment Method:</Text>
                    <Text fontWeight="600">{paymentMethod.toUpperCase()}</Text>
                  </Flex>
                </VStack>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4} w="full">
              <Button colorScheme="red" leftIcon={<CloseIcon />} onClick={cancelConfirmation} flex={1}>
                Cancel
              </Button>
              <Button colorScheme="green" leftIcon={<CheckIcon />} onClick={confirmOrder} flex={1}>
                Confirm Order
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="1200px">
        <Box textAlign="center" mb={8}>
          <HStack justify="center" spacing={4} mb={4}>
            <Text fontSize="3xl">🎂</Text>
            <Heading size="xl" color="primary.500">
              Birthday Party Booking
            </Heading>
            <Text fontSize="3xl">🎁</Text>
          </HStack>
          <Text color={mutedColor}>Book a memorable birthday celebration at {restaurant.name}</Text>
        </Box>

        {currentStep <= 4 && renderProgressSteps()}

        {currentStep === 1 && renderPackageSelection()}
        {currentStep === 2 && renderUserDetails()}
        {currentStep === 3 && renderOrderSummary()}
        {currentStep === 4 && renderPaymentMethods()}
        {currentStep === 5 && renderPaymentSuccess()}
      </Container>

      {renderConfirmationModal()}
    </Box>
  )
}

export default BirthdayPartyBooking
