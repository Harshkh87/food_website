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
  useColorModeValue,
  useToast,
  Icon,
} from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons"
import { Users, Calendar, Clock, Phone, User } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import InteractiveTableLayout from "./InteractiveTableLayout"

const tableSizes = [
  {
    id: "2-seater",
    name: "2-Seater Table",
    capacity: 2,
    icon: "👫",
    description: "Perfect for couples",
    price: 0,
  },
  {
    id: "4-seater",
    name: "4-Seater Table",
    capacity: 4,
    icon: "👨‍👩‍👧‍👦",
    description: "Great for small families",
    price: 0,
  },
  {
    id: "6-seater",
    name: "6-Seater Table",
    capacity: 6,
    icon: "👥",
    description: "Ideal for groups",
    price: 100,
  },
  {
    id: "8-seater",
    name: "8-Seater Table",
    capacity: 8,
    icon: "🎉",
    description: "Perfect for celebrations",
    price: 200,
  },
]

const steps = [
  { title: "Size", description: "Select Table Size" },
  { title: "Table", description: "Select Table" },
  { title: "Details", description: "Complete Booking" },
]

export default function TableBooking() {
  const { id } = useParams()
  const { activeStep, setActiveStep } = useSteps({ index: 0, count: steps.length })
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedTable, setSelectedTable] = useState(null)
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [bookingReference, setBookingReference] = useState("")

  const toast = useToast()
  const cardBg = useColorModeValue("white", "gray.800")

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
    setBookingDetails({ ...bookingDetails, guests: size.capacity.toString() })
    setActiveStep(1)
  }

  const handleTableSelect = (table) => {
    setSelectedTable(table)
    setActiveStep(2)
  }

  const handleBookingSubmit = () => {
    if (
      !bookingDetails.name ||
      !bookingDetails.email ||
      !bookingDetails.phone ||
      !bookingDetails.date ||
      !bookingDetails.time
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const reference = `TB${Date.now().toString().slice(-6)}`
    setBookingReference(reference)
    setBookingConfirmed(true)

    toast({
      title: "Booking Successfully Completed!",
      description: `Your table has been reserved. Reference: ${reference}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
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
            Booking Successfully Completed!
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Your table reservation has been confirmed. We look forward to serving you!
          </Text>

          <Card bg={cardBg} w="full" maxW="md">
            <CardBody>
              <VStack spacing={4}>
                <Text fontWeight="bold" fontSize="lg">
                  Booking Reference: #{bookingReference}
                </Text>
                <Box w="full" textAlign="left">
                  <VStack spacing={3} align="start">
                    <HStack>
                      <Icon as={Users} />
                      <Text fontWeight="semibold">Table:</Text>
                      <Text>
                        {selectedTable?.tableName} ({selectedSize?.name})
                      </Text>
                    </HStack>
                    <HStack>
                      <Icon as={Calendar} />
                      <Text fontWeight="semibold">Date:</Text>
                      <Text>{bookingDetails.date}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={Clock} />
                      <Text fontWeight="semibold">Time:</Text>
                      <Text>{bookingDetails.time}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={User} />
                      <Text fontWeight="semibold">Guests:</Text>
                      <Text>{bookingDetails.guests}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={Phone} />
                      <Text fontWeight="semibold">Contact:</Text>
                      <Text>{bookingDetails.phone}</Text>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <VStack spacing={4}>
            <Text fontSize="sm" color="gray.600">
              A confirmation SMS and email will be sent to you shortly.
            </Text>
            <HStack spacing={4}>
              <Button colorScheme="orange" onClick={() => (window.location.href = "/")}>
                Back to Home
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                Print Confirmation
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8}>
        <VStack spacing={2} textAlign="center">
          <Heading size="xl">Table Booking</Heading>
          <Text color="gray.600">Reserve your perfect dining experience</Text>
        </VStack>

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
          {/* Step 1: Select Table Size */}
          {activeStep === 0 && (
            <VStack spacing={6}>
              <Heading size="lg">Select Your Table Size</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
                {tableSizes.map((size) => (
                  <Card
                    key={size.id}
                    bg={cardBg}
                    cursor="pointer"
                    _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
                    onClick={() => handleSizeSelect(size)}
                    transition="all 0.3s"
                    border={selectedSize?.id === size.id ? "2px solid" : "1px solid"}
                    borderColor={selectedSize?.id === size.id ? "orange.500" : "gray.200"}
                  >
                    <CardBody textAlign="center">
                      <VStack spacing={4}>
                        <Text fontSize="4xl">{size.icon}</Text>
                        <Heading size="md">{size.name}</Heading>
                        <Text color="gray.600">{size.description}</Text>
                        <Badge colorScheme="blue" fontSize="sm">
                          Up to {size.capacity} guests
                        </Badge>
                        {size.price > 0 && (
                          <Text color="orange.500" fontWeight="bold">
                            +₹{size.price} booking fee
                          </Text>
                        )}
                        <Button colorScheme="orange" size="sm" w="full">
                          Select This Size
                        </Button>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          )}

          {/* Step 2: Select Table */}
          {activeStep === 1 && (
            <VStack spacing={6}>
              <VStack spacing={2} textAlign="center">
                <Heading size="lg">Select Your Table</Heading>
                <Text color="gray.600">
                  Choose from available {selectedSize?.name.toLowerCase()}s in our restaurant
                </Text>
                <Badge colorScheme="orange" px={3} py={1}>
                  Selected: {selectedSize?.name}
                </Badge>
              </VStack>

              {/* Interactive Table Layout */}
              <Card bg={cardBg} w="full">
                <CardBody>
                  <InteractiveTableLayout
                    selectedSize={selectedSize}
                    onTableSelect={handleTableSelect}
                    selectedTable={selectedTable}
                  />
                </CardBody>
              </Card>

              <HStack spacing={4}>
                <Button onClick={() => setActiveStep(0)}>Back to Size Selection</Button>
                {selectedTable && (
                  <Button colorScheme="orange" onClick={() => setActiveStep(2)}>
                    Continue with {selectedTable.tableName}
                  </Button>
                )}
              </HStack>
            </VStack>
          )}

          {/* Step 3: Complete Booking */}
          {activeStep === 2 && (
            <Card bg={cardBg} maxW="2xl" mx="auto">
              <CardHeader>
                <VStack spacing={2}>
                  <Heading size="lg">Complete Your Booking</Heading>
                  <HStack spacing={4}>
                    <Badge colorScheme="orange">{selectedSize?.name}</Badge>
                    <Badge colorScheme="blue">{selectedTable?.name}</Badge>
                  </HStack>
                </VStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={6}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                    <FormControl isRequired>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        name="name"
                        value={bookingDetails.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        name="phone"
                        value={bookingDetails.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        name="email"
                        type="email"
                        value={bookingDetails.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Number of Guests</FormLabel>
                      <Select name="guests" value={bookingDetails.guests} onChange={handleInputChange}>
                        {Array.from({ length: selectedSize?.capacity || 8 }, (_, i) => i + 1).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Reservation Date</FormLabel>
                      <Input
                        name="date"
                        type="date"
                        value={bookingDetails.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Reservation Time</FormLabel>
                      <Select
                        name="time"
                        value={bookingDetails.time}
                        onChange={handleInputChange}
                        placeholder="Select time"
                      >
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="1:00 PM">1:00 PM</option>
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="2:00 PM">2:00 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="6:30 PM">6:30 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="8:30 PM">8:30 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>

                  <FormControl>
                    <FormLabel>Special Requests</FormLabel>
                    <Textarea
                      name="specialRequests"
                      value={bookingDetails.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special requirements, dietary restrictions, or celebration details..."
                      rows={4}
                    />
                  </FormControl>

                  {/* Booking Summary */}
                  <Card variant="outline" w="full">
                    <CardBody>
                      <VStack spacing={3}>
                        <Heading size="sm">Booking Summary</Heading>
                        <HStack justify="space-between" w="full">
                          <Text>Table:</Text>
                          <Text fontWeight="semibold">{selectedTable?.name}</Text>
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text>Size:</Text>
                          <Text fontWeight="semibold">{selectedSize?.name}</Text>
                        </HStack>
                        <HStack justify="space-between" w="full">
                          <Text>Location:</Text>
                          <Text fontWeight="semibold">{selectedTable?.location}</Text>
                        </HStack>
                        {selectedSize?.price > 0 && (
                          <HStack justify="space-between" w="full">
                            <Text>Booking Fee:</Text>
                            <Text fontWeight="semibold" color="orange.500">
                              ₹{selectedSize.price}
                            </Text>
                          </HStack>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>

                  <HStack spacing={4} w="full" justify="center">
                    <Button onClick={() => setActiveStep(1)}>Back to Table Selection</Button>
                    <Button colorScheme="orange" onClick={handleBookingSubmit} size="lg">
                      Complete Booking
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
