"use client"

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
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
  Badge,
  Divider,
  useColorModeValue,
  useToast,
  Image,
  Flex,
} from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons"
import { Calendar, Users, Clock, Gift } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

const birthdayPackages = [
  {
    id: 1,
    name: "Basic Birthday Package",
    price: 2999,
    image: "/placeholder.svg?height=200&width=300",
    description: "Perfect for intimate celebrations",
    features: [
      "Decorated table for up to 6 people",
      "Birthday cake (1kg)",
      "Balloons and basic decorations",
      "Special birthday song",
      "Complimentary soft drinks",
    ],
    maxGuests: 6,
  },
  {
    id: 2,
    name: "Premium Birthday Package",
    price: 4999,
    image: "/placeholder.svg?height=200&width=300",
    description: "Great for family celebrations",
    features: [
      "Decorated private area for up to 12 people",
      "Custom birthday cake (2kg)",
      "Premium decorations with theme",
      "Professional photography (30 mins)",
      "Welcome drinks for all guests",
      "Special birthday menu",
    ],
    maxGuests: 12,
    popular: true,
  },
  {
    id: 3,
    name: "Deluxe Birthday Package",
    price: 7999,
    image: "/placeholder.svg?height=200&width=300",
    description: "Ultimate birthday experience",
    features: [
      "Private party hall for up to 20 people",
      "Multi-tier custom cake (3kg)",
      "Complete theme-based decoration",
      "Professional DJ and music system",
      "Photography and videography (2 hours)",
      "Full course birthday dinner",
      "Party favors for all guests",
    ],
    maxGuests: 20,
  },
]

const steps = [
  { title: "Package", description: "Select Package" },
  { title: "Details", description: "Your Details" },
  { title: "Summary", description: "Order Summary" },
  { title: "Payment", description: "Payment" },
]

export default function BirthdayBooking() {
  const { id } = useParams()
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length })
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventTime: "",
    guestCount: "",
    specialRequests: "",
    celebrantName: "",
    celebrantAge: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const toast = useToast()
  const cardBg = useColorModeValue("white", "gray.800")

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg)
    setActiveStep(1)
  }

  const handleDetailsSubmit = () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.phone || !bookingDetails.eventDate) {
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
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setBookingConfirmed(true)
      setActiveStep(3)
      toast({
        title: "Booking Confirmed!",
        description: "Your birthday celebration has been booked successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }, 2000)
  }

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    })
  }

  if (bookingConfirmed) {
    return (
      <Container maxW="4xl" py={8}>
        <VStack spacing={8} textAlign="center">
          <Box color="green.500" fontSize="6xl">
            <CheckIcon />
          </Box>
          <Heading size="xl" color="green.500">
            Booking Confirmed!
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Your birthday celebration has been successfully booked. We'll send you a confirmation email shortly.
          </Text>
          <Card bg={cardBg} w="full" maxW="md">
            <CardBody>
              <VStack spacing={4}>
                <Text fontWeight="bold">Booking Reference: #BD{Date.now().toString().slice(-6)}</Text>
                <Divider />
                <HStack justify="space-between" w="full">
                  <Text>Package:</Text>
                  <Text fontWeight="semibold">{selectedPackage?.name}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text>Date:</Text>
                  <Text fontWeight="semibold">{bookingDetails.eventDate}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text>Time:</Text>
                  <Text fontWeight="semibold">{bookingDetails.eventTime}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text>Guests:</Text>
                  <Text fontWeight="semibold">{bookingDetails.guestCount}</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
          <Button colorScheme="orange" onClick={() => (window.location.href = "/")}>
            Back to Home
          </Button>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8}>
        <Heading size="xl" textAlign="center">
          Birthday Celebration Booking
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
          {/* Step 1: Package Selection */}
          {activeStep === 0 && (
            <VStack spacing={6}>
              <Heading size="lg">Select Your Birthday Package</Heading>
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
                {birthdayPackages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    bg={cardBg}
                    cursor="pointer"
                    _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
                    onClick={() => handlePackageSelect(pkg)}
                    position="relative"
                    border={selectedPackage?.id === pkg.id ? "2px solid" : "1px solid"}
                    borderColor={selectedPackage?.id === pkg.id ? "orange.500" : "gray.200"}
                  >
                    {pkg.popular && (
                      <Badge
                        position="absolute"
                        top="-10px"
                        left="50%"
                        transform="translateX(-50%)"
                        colorScheme="orange"
                        px={3}
                        py={1}
                        borderRadius="full"
                      >
                        Most Popular
                      </Badge>
                    )}
                    <CardBody>
                      <Image
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.name}
                        borderRadius="md"
                        h="150px"
                        w="full"
                        objectFit="cover"
                        mb={4}
                      />
                      <VStack spacing={4} align="start">
                        <Heading size="md">{pkg.name}</Heading>
                        <Text color="gray.600">{pkg.description}</Text>
                        <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                          ₹{pkg.price.toLocaleString()}
                        </Text>
                        <VStack spacing={2} align="start" w="full">
                          {pkg.features.map((feature, index) => (
                            <HStack key={index}>
                              <CheckIcon color="green.500" boxSize={3} />
                              <Text fontSize="sm">{feature}</Text>
                            </HStack>
                          ))}
                        </VStack>
                        <HStack>
                          <Users size={16} />
                          <Text fontSize="sm">Up to {pkg.maxGuests} guests</Text>
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          )}

          {/* Step 2: Your Details */}
          {activeStep === 1 && (
            <Card bg={cardBg} maxW="2xl" mx="auto">
              <CardHeader>
                <Heading size="lg">Your Details</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={6}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                    <FormControl isRequired>
                      <FormLabel>Your Name</FormLabel>
                      <Input
                        name="name"
                        value={bookingDetails.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        name="email"
                        type="email"
                        value={bookingDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        name="phone"
                        value={bookingDetails.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Event Date</FormLabel>
                      <Input
                        name="eventDate"
                        type="date"
                        value={bookingDetails.eventDate}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Event Time</FormLabel>
                      <Select
                        name="eventTime"
                        value={bookingDetails.eventTime}
                        onChange={handleInputChange}
                        placeholder="Select time"
                      >
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Number of Guests</FormLabel>
                      <Select
                        name="guestCount"
                        value={bookingDetails.guestCount}
                        onChange={handleInputChange}
                        placeholder="Select guests"
                      >
                        {Array.from({ length: selectedPackage?.maxGuests || 20 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Celebrant Name</FormLabel>
                      <Input
                        name="celebrantName"
                        value={bookingDetails.celebrantName}
                        onChange={handleInputChange}
                        placeholder="Birthday person's name"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Celebrant Age</FormLabel>
                      <Input
                        name="celebrantAge"
                        type="number"
                        value={bookingDetails.celebrantAge}
                        onChange={handleInputChange}
                        placeholder="Age"
                      />
                    </FormControl>
                  </SimpleGrid>
                  <FormControl>
                    <FormLabel>Special Requests</FormLabel>
                    <Textarea
                      name="specialRequests"
                      value={bookingDetails.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special requirements or requests..."
                      rows={4}
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
            <Card bg={cardBg} maxW="2xl" mx="auto">
              <CardHeader>
                <Heading size="lg">Order Summary</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={6}>
                  <Box w="full">
                    <Heading size="md" mb={4}>
                      Selected Package
                    </Heading>
                    <Card variant="outline">
                      <CardBody>
                        <Flex gap={4}>
                          <Image
                            src={selectedPackage?.image || "/placeholder.svg"}
                            alt={selectedPackage?.name}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="md"
                          />
                          <VStack align="start" flex={1}>
                            <Heading size="sm">{selectedPackage?.name}</Heading>
                            <Text color="gray.600">{selectedPackage?.description}</Text>
                            <Text fontSize="lg" fontWeight="bold" color="orange.500">
                              ₹{selectedPackage?.price.toLocaleString()}
                            </Text>
                          </VStack>
                        </Flex>
                      </CardBody>
                    </Card>
                  </Box>

                  <Divider />

                  <Box w="full">
                    <Heading size="md" mb={4}>
                      Event Details
                    </Heading>
                    <VStack spacing={3} align="start">
                      <HStack>
                        <Text fontWeight="semibold" w="120px">
                          Name:
                        </Text>
                        <Text>{bookingDetails.name}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="semibold" w="120px">
                          Email:
                        </Text>
                        <Text>{bookingDetails.email}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight="semibold" w="120px">
                          Phone:
                        </Text>
                        <Text>{bookingDetails.phone}</Text>
                      </HStack>
                      <HStack>
                        <Calendar size={16} />
                        <Text fontWeight="semibold" w="120px">
                          Date:
                        </Text>
                        <Text>{bookingDetails.eventDate}</Text>
                      </HStack>
                      <HStack>
                        <Clock size={16} />
                        <Text fontWeight="semibold" w="120px">
                          Time:
                        </Text>
                        <Text>{bookingDetails.eventTime}</Text>
                      </HStack>
                      <HStack>
                        <Users size={16} />
                        <Text fontWeight="semibold" w="120px">
                          Guests:
                        </Text>
                        <Text>{bookingDetails.guestCount}</Text>
                      </HStack>
                      {bookingDetails.celebrantName && (
                        <HStack>
                          <Gift size={16} />
                          <Text fontWeight="semibold" w="120px">
                            Celebrant:
                          </Text>
                          <Text>
                            {bookingDetails.celebrantName}
                            {bookingDetails.celebrantAge && ` (${bookingDetails.celebrantAge} years)`}
                          </Text>
                        </HStack>
                      )}
                    </VStack>
                  </Box>

                  <Divider />

                  <Box w="full">
                    <HStack justify="space-between" fontSize="xl" fontWeight="bold">
                      <Text>Total Amount:</Text>
                      <Text color="orange.500">₹{selectedPackage?.price.toLocaleString()}</Text>
                    </HStack>
                  </Box>

                  <HStack spacing={4} w="full" justify="center">
                    <Button onClick={() => setActiveStep(1)}>Back</Button>
                    <Button colorScheme="orange" onClick={handlePayment} isLoading={isProcessing}>
                      Proceed to Payment
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          )}
        </Box>
      </VStack>
    </Container>
  )
}
