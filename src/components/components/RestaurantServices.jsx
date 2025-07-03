"use client"

import { useState } from "react"
import {
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Card,
  CardBody,
  Badge,
  SimpleGrid,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react"
import BirthdayPartyBooking from "../components/birthday/birthday";
const RestaurantServices = ({ restaurant }) => {
  const [activeService, setActiveService] = useState(null)
  const [showBirthdayBooking, setShowBirthdayBooking] = useState(false)

  const cardBg = useColorModeValue("white", "gray.800")
  const mutedColor = useColorModeValue("gray.600", "gray.400")

  const handleServiceClick = (service) => {
    if (service === "party") {
      setShowBirthdayBooking(true)
    } else {
      setActiveService(service)
    }
  }

  const handleCallWaiter = () => {
    alert("🔔 Waiter has been notified! They will be with you shortly.")
  }

  const handleCallRestaurant = () => {
    window.open(`tel:${restaurant.phone}`)
  }

  const handleTableBooking = () => {
    alert("Table booking feature coming soon! Please call the restaurant directly.")
  }

  return (
    <>
      <Card bg={cardBg} mb={8}>
        <CardBody p={6}>
          <VStack spacing={6} align="stretch">
            <HStack justify="space-between" align="center">
              <Heading size="md" color="primary.500">
                🍽️ Restaurant Services
              </Heading>
              <Badge colorScheme={restaurant.isOpen ? "green" : "red"} size="lg" px={3} py={1}>
                {restaurant.isOpen ? "🟢 Open Now" : "🔴 Closed"}
              </Badge>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              <Card
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                  borderColor: "primary.500",
                }}
                onClick={handleTableBooking}
                border="1px"
                borderColor="gray.200"
              >
                <CardBody textAlign="center" p={6}>
                  <VStack spacing={4}>
                    <Text fontSize="3xl">🍽️</Text>
                    <VStack spacing={2}>
                      <Heading size="sm">Dine In</Heading>
                      <Text fontSize="sm" color={mutedColor} textAlign="center">
                        Reserve a table for your perfect dining experience
                      </Text>
                    </VStack>
                    <Button colorScheme="primary" size="sm" isDisabled={!restaurant.isOpen} w="full">
                      Book Table
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                  borderColor: "primary.500",
                }}
                onClick={() => handleServiceClick("party")}
                border="1px"
                borderColor="gray.200"
              >
                <CardBody textAlign="center" p={6}>
                  <VStack spacing={4}>
                    <Text fontSize="3xl">🎉</Text>
                    <VStack spacing={2}>
                      <Heading size="sm">Birthday Party</Heading>
                      <Text fontSize="sm" color={mutedColor} textAlign="center">
                        Make your special occasions memorable with us
                      </Text>
                    </VStack>
                    <Button colorScheme="secondary" size="sm" w="full">
                      Book Party
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                  borderColor: "primary.500",
                }}
                onClick={handleCallWaiter}
                border="1px"
                borderColor="gray.200"
              >
                <CardBody textAlign="center" p={6}>
                  <VStack spacing={4}>
                    <Text fontSize="3xl">🔔</Text>
                    <VStack spacing={2}>
                      <Heading size="sm">Table Service</Heading>
                      <Text fontSize="sm" color={mutedColor} textAlign="center">
                        Need assistance? Call our waiter instantly
                      </Text>
                    </VStack>
                    <Button variant="outline" colorScheme="primary" size="sm" w="full">
                      Call Waiter
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              <Card
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                  borderColor: "primary.500",
                }}
                onClick={handleCallRestaurant}
                border="1px"
                borderColor="gray.200"
              >
                <CardBody textAlign="center" p={6}>
                  <VStack spacing={4}>
                    <Text fontSize="3xl">📞</Text>
                    <VStack spacing={2}>
                      <Heading size="sm">Direct Contact</Heading>
                      <Text fontSize="sm" color={mutedColor} textAlign="center">
                        Speak directly with the restaurant
                      </Text>
                    </VStack>
                    <Button variant="outline" colorScheme="primary" size="sm" w="full">
                      Call Restaurant
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>

      {/* Birthday Party Booking Modal */}
      <Modal
        isOpen={showBirthdayBooking}
        onClose={() => setShowBirthdayBooking(false)}
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton zIndex={10} />
          <BirthdayPartyBooking restaurant={restaurant} onClose={() => setShowBirthdayBooking(false)} />
        </ModalContent>
      </Modal>
    </>
  )
}

export default RestaurantServices
