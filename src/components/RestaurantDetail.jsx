"use client"

import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  HStack,
  VStack,
  Badge,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Input,
  Select,
  Flex,
  useColorModeValue,
  Icon,
  Divider,
} from "@chakra-ui/react"
import { StarIcon, PhoneIcon } from "@chakra-ui/icons"
import { MapPin, Clock, Calendar, Users, Utensils } from "lucide-react"
import { useParams, Link as RouterLink } from "react-router-dom"
import { useState } from "react"

const services = [
  { name: "Table Booking", icon: Calendar, description: "Reserve your table in advance" },
  { name: "Birthday Party", icon: Users, description: "Special arrangements for celebrations" },
  { name: "Table Service", icon: Utensils, description: "Dine-in with full table service" },
]

export default function RestaurantDetail({ restaurants, addToCart }) {
  const { id } = useParams()
  const restaurant = restaurants.find((r) => r.id === Number.parseInt(id))
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedType, setSelectedType] = useState("")

  const cardBg = useColorModeValue("white", "gray.800")

  if (!restaurant) {
    return (
      <Container maxW="6xl" py={8}>
        <Text>Restaurant not found</Text>
      </Container>
    )
  }

  const filteredMenuItems = restaurant.menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    const matchesType = !selectedType || item.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const menuCategories = [...new Set(restaurant.menuItems.map((item) => item.category))]

  return (
    <Container maxW="6xl" py={8}>
      {/* Restaurant Header */}
      <Card bg={cardBg} mb={8}>
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Image
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              borderRadius="lg"
              h="300px"
              w="full"
              objectFit="cover"
            />

            <VStack align="start" spacing={4}>
              <Heading size="xl">{restaurant.name}</Heading>

              <HStack>
                <MapPin size={20} />
                <Text>{restaurant.address}</Text>
              </HStack>

              <HStack>
                <PhoneIcon />
                <Text>{restaurant.phone}</Text>
              </HStack>

              <HStack>
                <StarIcon color="yellow.400" />
                <Text fontWeight="semibold">{restaurant.rating} Rating</Text>
                <Badge colorScheme={restaurant.type === "Veg" ? "green" : "red"}>{restaurant.type}</Badge>
              </HStack>

              <HStack>
                <Clock size={16} />
                <Text color={restaurant.isOpen ? "green.500" : "red.500"}>
                  {restaurant.isOpen ? "Open Now" : "Closed"}
                </Text>
                <Text>• {restaurant.openingHours}</Text>
              </HStack>

              <Text color="gray.600" lineHeight="tall">
                {restaurant.description}
              </Text>

              <HStack wrap="wrap" spacing={2}>
                {restaurant.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </HStack>
            </VStack>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Current Offers */}
      {restaurant.hasOffers && (
        <Card bg="green.50" borderColor="green.200" borderWidth={1} mb={8}>
          <CardBody>
            <Heading size="md" color="green.700" mb={4}>
              Current Offers
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Text fontWeight="semibold" color="green.600">
                  20% OFF on orders above ₹500
                </Text>
                <Text fontSize="sm" color="green.500">
                  Use code: SAVE20
                </Text>
              </Box>
              <Box>
                <Text fontWeight="semibold" color="green.600">
                  Free Delivery on first order
                </Text>
                <Text fontSize="sm" color="green.500">
                  Use code: FREEDEL
                </Text>
              </Box>
            </SimpleGrid>
          </CardBody>
        </Card>
      )}

      {/* Services */}
      <Box mb={8}>
        <Heading size="lg" mb={6}>
          Our Services
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {services.map((service, index) => (
            <Card key={index} bg={cardBg} _hover={{ shadow: "md" }}>
              <CardBody textAlign="center">
                <Icon as={service.icon} boxSize={12} color="orange.500" mb={4} />
                <Heading size="md" mb={2}>
                  {service.name}
                </Heading>
                <Text color="gray.600" mb={4}>
                  {service.description}
                </Text>
                <Button
                  colorScheme="orange"
                  size="sm"
                  as={
                    service.name === "Birthday Party" ||
                    service.name === "Table Service" ||
                    service.name === "Table Booking"
                      ? RouterLink
                      : Button
                  }
                  to={
                    service.name === "Birthday Party"
                      ? `/birthday-booking/${restaurant.id}`
                      : service.name === "Table Service"
                        ? `/table-service/${restaurant.id}`
                        : service.name === "Table Booking"
                          ? `/table-booking/${restaurant.id}`
                          : undefined
                  }
                  onClick={
                    service.name !== "Birthday Party" &&
                    service.name !== "Table Service" &&
                    service.name !== "Table Booking"
                      ? () => {}
                      : undefined
                  }
                >
                  {service.name === "Birthday Party"
                    ? "Book Birthday Party"
                    : service.name === "Table Service"
                      ? "Access Table Service"
                      : service.name === "Table Booking"
                        ? "Reserve Table"
                        : "Book Now"}
                </Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>

      <Divider my={8} />

      {/* Menu Section */}
      <Box>
        <Heading size="lg" mb={6}>
          Food Menu
        </Heading>

        {/* Menu Filters */}
        <Card bg={cardBg} mb={6}>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select
                placeholder="Select Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {menuCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <Select placeholder="Select Type" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </Select>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Menu Items */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {filteredMenuItems.map((item) => (
            <Card key={item.id} bg={cardBg}>
              <CardBody>
                <Flex gap={4}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <VStack align="start" flex={1} spacing={2}>
                    <HStack justify="space-between" w="full">
                      <Heading size="sm">{item.name}</Heading>
                      <Badge colorScheme={item.type === "Veg" ? "green" : "red"}>{item.type}</Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {item.description}
                    </Text>
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="bold" color="orange.500">
                        ₹{item.price}
                      </Text>
                      <Button colorScheme="orange" size="sm" onClick={() => addToCart(item)}>
                        Add to Cart
                      </Button>
                    </HStack>
                  </VStack>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  )
}
