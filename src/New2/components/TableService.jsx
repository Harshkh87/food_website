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
  useColorModeValue,
  useToast,
  Icon,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react"
import { Bell, Droplets, Sparkles, Receipt, Clock, Users, CheckCircle, Coffee } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const waiterServices = [
  {
    id: "call-waiter",
    name: "Call Waiter",
    icon: Bell,
    description: "Request waiter assistance",
    color: "blue",
  },
  {
    id: "table-cleaning",
    name: "Table Cleaning",
    icon: Sparkles,
    description: "Request table cleaning service",
    color: "green",
  },
  {
    id: "water-refill",
    name: "Water Refill",
    icon: Droplets,
    description: "Request water refill",
    color: "cyan",
  },
  {
    id: "request-bill",
    name: "Request Bill",
    icon: Receipt,
    description: "Request your bill",
    color: "orange",
  },
]

const mockOrderQueue = [
  { orderNumber: "ORD001", status: "preparing", estimatedTime: 5 },
  { orderNumber: "ORD002", status: "preparing", estimatedTime: 8 },
  { orderNumber: "ORD003", status: "ready", estimatedTime: 0 },
  { orderNumber: "ORD004", status: "preparing", estimatedTime: 12 },
  { orderNumber: "ORD005", status: "preparing", estimatedTime: 15 },
]

export default function TableService({ restaurant, userOrderNumber = "ORD003", tableNumber = "T-12" }) {
  const { id } = useParams()
  const [currentOrder, setCurrentOrder] = useState(null)
  const [queuePosition, setQueuePosition] = useState(0)
  const [serviceRequests, setServiceRequests] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [serviceNote, setServiceNote] = useState("")
  const [urgency, setUrgency] = useState("normal")

  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const cardBg = useColorModeValue("white", "gray.800")

  // Mock restaurant data if not provided
  const mockRestaurant = restaurant || {
    id: 1,
    name: "Spice Garden",
    hasWaiterService: true,
    tableServiceHours: "11:00 AM - 10:00 PM",
  }

  useEffect(() => {
    // Find user's order in queue
    const userOrder = mockOrderQueue.find((order) => order.orderNumber === userOrderNumber)
    setCurrentOrder(userOrder)

    // Calculate queue position
    const position = mockOrderQueue.findIndex((order) => order.orderNumber === userOrderNumber)
    setQueuePosition(position + 1)
  }, [userOrderNumber])

  const handleServiceRequest = (service) => {
    setSelectedService(service)
    setServiceNote("")
    setUrgency("normal")
    onOpen()
  }

  const submitServiceRequest = () => {
    const newRequest = {
      id: Date.now(),
      service: selectedService,
      note: serviceNote,
      urgency: urgency,
      timestamp: new Date(),
      status: "pending",
    }

    setServiceRequests([...serviceRequests, newRequest])

    toast({
      title: "Service Request Sent!",
      description: `Your ${selectedService.name.toLowerCase()} request has been sent to the waiter.`,
      status: "success",
      duration: 4000,
      isClosable: true,
    })

    onClose()
  }

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "yellow"
      case "ready":
        return "green"
      case "served":
        return "blue"
      default:
        return "gray"
    }
  }

  const getOrderStatusText = (status) => {
    switch (status) {
      case "preparing":
        return "Being Prepared"
      case "ready":
        return "Ready to Serve"
      case "served":
        return "Served"
      default:
        return "Unknown"
    }
  }

  // If restaurant doesn't support waiter service
  if (!mockRestaurant.hasWaiterService) {
    return (
      <Container maxW="4xl" py={8}>
        <VStack spacing={8}>
          <Heading size="xl" textAlign="center">
            Table Service
          </Heading>

          <Alert status="info" borderRadius="lg" p={6}>
            <AlertIcon boxSize={8} />
            <Box>
              <AlertTitle fontSize="lg" mb={2}>
                Self-Service Restaurant
              </AlertTitle>
              <AlertDescription fontSize="md">
                This restaurant follows self-service. Please collect your order directly from the counter or as
                instructed by the staff.
              </AlertDescription>
            </Box>
          </Alert>

          {/* Order Tracking for Self-Service */}
          <Card bg={cardBg} w="full" maxW="2xl">
            <CardHeader>
              <Heading size="md" textAlign="center">
                Order Tracking
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <HStack justify="space-between" w="full">
                  <Text fontWeight="semibold">Order Number:</Text>
                  <Badge colorScheme="orange" fontSize="md" px={3} py={1}>
                    {userOrderNumber}
                  </Badge>
                </HStack>

                <HStack justify="space-between" w="full">
                  <Text fontWeight="semibold">Status:</Text>
                  <Badge colorScheme={getOrderStatusColor(currentOrder?.status)} fontSize="sm">
                    {getOrderStatusText(currentOrder?.status)}
                  </Badge>
                </HStack>

                {currentOrder?.estimatedTime > 0 && (
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="semibold">Estimated Time:</Text>
                    <Text color="orange.500" fontWeight="bold">
                      {currentOrder.estimatedTime} minutes
                    </Text>
                  </HStack>
                )}

                <Text fontSize="sm" color="gray.600" textAlign="center" mt={4}>
                  Please wait for your order number to be called at the counter.
                </Text>
              </VStack>
            </CardBody>
          </Card>

          <Button colorScheme="orange" onClick={() => window.history.back()}>
            Back to Restaurant
          </Button>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8}>
        <VStack spacing={2} textAlign="center">
          <Heading size="xl">Table Service</Heading>
          <Text color="gray.600">
            {mockRestaurant.name} • Table {tableNumber}
          </Text>
          <Badge colorScheme="green" px={3} py={1}>
            Waiter Service Available: {mockRestaurant.tableServiceHours}
          </Badge>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
          {/* Order Tracking Section */}
          <VStack spacing={6}>
            <Card bg={cardBg} w="full">
              <CardHeader>
                <Heading size="md" textAlign="center">
                  <Icon as={Clock} mr={2} />
                  Order Tracking
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4}>
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="semibold">Your Order:</Text>
                    <Badge colorScheme="orange" fontSize="md" px={3} py={1}>
                      {userOrderNumber}
                    </Badge>
                  </HStack>

                  <HStack justify="space-between" w="full">
                    <Text fontWeight="semibold">Status:</Text>
                    <Badge colorScheme={getOrderStatusColor(currentOrder?.status)} fontSize="sm">
                      {getOrderStatusText(currentOrder?.status)}
                    </Badge>
                  </HStack>

                  {currentOrder?.estimatedTime > 0 && (
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="semibold">Estimated Time:</Text>
                      <Text color="orange.500" fontWeight="bold">
                        {currentOrder.estimatedTime} minutes
                      </Text>
                    </HStack>
                  )}

                  <HStack justify="space-between" w="full">
                    <Text fontWeight="semibold">Queue Position:</Text>
                    <Badge colorScheme="blue" fontSize="sm">
                      #{queuePosition} in queue
                    </Badge>
                  </HStack>

                  {currentOrder?.status === "ready" && (
                    <Alert status="success" borderRadius="md">
                      <AlertIcon />
                      <Box>
                        <AlertTitle fontSize="sm">Order Ready!</AlertTitle>
                        <AlertDescription fontSize="xs">
                          Your order is ready to be served to your table.
                        </AlertDescription>
                      </Box>
                    </Alert>
                  )}
                </VStack>
              </CardBody>
            </Card>

            {/* Current Queue Status */}
            <Card bg={cardBg} w="full">
              <CardHeader>
                <Heading size="md" textAlign="center">
                  <Icon as={Users} mr={2} />
                  Current Queue
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={3}>
                  <Text fontSize="sm" color="gray.600" textAlign="center">
                    Orders currently being served:
                  </Text>

                  {mockOrderQueue.slice(0, 5).map((order, index) => (
                    <HStack
                      key={order.orderNumber}
                      justify="space-between"
                      w="full"
                      p={2}
                      borderRadius="md"
                      bg={order.orderNumber === userOrderNumber ? "orange.50" : "transparent"}
                      border={order.orderNumber === userOrderNumber ? "1px solid" : "none"}
                      borderColor={order.orderNumber === userOrderNumber ? "orange.200" : "transparent"}
                    >
                      <HStack>
                        <Badge
                          colorScheme={order.orderNumber === userOrderNumber ? "orange" : "gray"}
                          variant={order.orderNumber === userOrderNumber ? "solid" : "outline"}
                        >
                          {order.orderNumber}
                        </Badge>
                        {order.orderNumber === userOrderNumber && (
                          <Text fontSize="xs" color="orange.600" fontWeight="bold">
                            (Your Order)
                          </Text>
                        )}
                      </HStack>

                      <HStack spacing={2}>
                        <Badge colorScheme={getOrderStatusColor(order.status)} size="sm">
                          {getOrderStatusText(order.status)}
                        </Badge>
                        {order.estimatedTime > 0 && (
                          <Text fontSize="xs" color="gray.500">
                            {order.estimatedTime}min
                          </Text>
                        )}
                      </HStack>
                    </HStack>
                  ))}
                </VStack>
              </CardBody>
            </Card>
          </VStack>

          {/* Waiter Service Requests */}
          <VStack spacing={6}>
            <Card bg={cardBg} w="full">
              <CardHeader>
                <Heading size="md" textAlign="center">
                  <Icon as={Bell} mr={2} />
                  Waiter Services
                </Heading>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={{ base: 2, md: 2 }} spacing={4}>
                  {waiterServices.map((service) => (
                    <Button
                      key={service.id}
                      leftIcon={<Icon as={service.icon} />}
                      colorScheme={service.color}
                      variant="outline"
                      size="lg"
                      h="auto"
                      py={4}
                      flexDirection="column"
                      onClick={() => handleServiceRequest(service)}
                      _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                    >
                      <Text fontWeight="bold" mb={1}>
                        {service.name}
                      </Text>
                      <Text fontSize="xs" opacity={0.8} textAlign="center">
                        {service.description}
                      </Text>
                    </Button>
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>

            {/* Active Service Requests */}
            {serviceRequests.length > 0 && (
              <Card bg={cardBg} w="full">
                <CardHeader>
                  <Heading size="md" textAlign="center">
                    <Icon as={CheckCircle} mr={2} />
                    Active Requests
                  </Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={3}>
                    {serviceRequests.slice(-3).map((request) => (
                      <Card key={request.id} variant="outline" w="full">
                        <CardBody py={3}>
                          <HStack justify="space-between">
                            <HStack>
                              <Icon as={request.service.icon} color={`${request.service.color}.500`} />
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="semibold" fontSize="sm">
                                  {request.service.name}
                                </Text>
                                <Text fontSize="xs" color="gray.500">
                                  {request.timestamp.toLocaleTimeString()}
                                </Text>
                              </VStack>
                            </HStack>
                            <Badge colorScheme={request.urgency === "urgent" ? "red" : "yellow"} size="sm">
                              {request.status}
                            </Badge>
                          </HStack>
                          {request.note && (
                            <Text fontSize="xs" color="gray.600" mt={2}>
                              Note: {request.note}
                            </Text>
                          )}
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            )}

            {/* Restaurant Info */}
            <Card bg="blue.50" borderColor="blue.200" borderWidth={1} w="full">
              <CardBody>
                <VStack spacing={2} textAlign="center">
                  <Icon as={Coffee} color="blue.500" boxSize={6} />
                  <Text fontWeight="semibold" color="blue.700">
                    Dine-In Service Only
                  </Text>
                  <Text fontSize="sm" color="blue.600">
                    This restaurant offers table service for dine-in customers only. No delivery service is available.
                  </Text>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </SimpleGrid>

        {/* Service Request Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack>
                <Icon as={selectedService?.icon} color={`${selectedService?.color}.500`} />
                <Text>{selectedService?.name}</Text>
              </HStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Urgency Level</FormLabel>
                  <Select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <Textarea
                    value={serviceNote}
                    onChange={(e) => setServiceNote(e.target.value)}
                    placeholder="Any specific instructions or details..."
                    rows={3}
                  />
                </FormControl>

                <Alert status="info" size="sm">
                  <AlertIcon />
                  <Text fontSize="sm">Your request will be sent to the waiter assigned to table {tableNumber}.</Text>
                </Alert>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme={selectedService?.color} onClick={submitServiceRequest}>
                Send Request
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  )
}
