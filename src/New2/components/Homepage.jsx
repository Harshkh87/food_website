"use client"

import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  HStack,
  VStack,
  Select,
  useColorModeValue,
  Icon,
  Center,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { Pizza, Coffee, Utensils, Cookie } from "lucide-react"
import { useState } from "react"
import RestaurantCard from "./RestaurantCard"

const categories = [
  { name: "Pizza", icon: Pizza, color: "red.500" },
  { name: "Coffee", icon: Coffee, color: "brown.500" },
  { name: "Chinese", icon: Utensils, color: "yellow.500" },
  { name: "Desserts", icon: Cookie, color: "pink.500" },
]

export default function Homepage({ restaurants }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedRating, setSelectedRating] = useState("")

  const bgGradient = useColorModeValue("linear(to-r, orange.400, red.500)", "linear(to-r, orange.600, red.700)")

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.categories.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCity = !selectedCity || restaurant.address.includes(selectedCity)
    const matchesType = !selectedType || restaurant.type === selectedType
    const matchesCategory = !selectedCategory || restaurant.categories.includes(selectedCategory)
    const matchesRating = !selectedRating || restaurant.rating >= Number.parseFloat(selectedRating)

    return matchesSearch && matchesCity && matchesType && matchesCategory && matchesRating
  })

  const todaysOffers = restaurants.filter((restaurant) => restaurant.hasOffers)

  return (
    <Box>
      {/* Hero Banner */}
      <Box bgGradient={bgGradient} py={20} color="white" textAlign="center">
        <Container maxW="6xl">
          <VStack spacing={6}>
            <Heading size="2xl" fontWeight="bold">
              Discover Amazing Food Near You
            </Heading>
            <Text fontSize="xl" opacity={0.9}>
              Order from your favorite restaurants and get it delivered fast
            </Text>

            <Box w="full" maxW="2xl">
              <HStack>
                <Input
                  placeholder="Search by restaurant, food item, or area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg="white"
                  color="black"
                  size="lg"
                />
                <Button leftIcon={<SearchIcon />} colorScheme="orange" size="lg">
                  Search
                </Button>
              </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>

      <Container maxW="7xl" py={8}>
        {/* Filters */}
        <Box mb={8}>
          <Heading size="lg" mb={4}>
            Filter Restaurants
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4}>
            <Select placeholder="Select City" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
            </Select>
            <Select
              placeholder="Restaurant Type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Both">Both</option>
            </Select>
            <Select
              placeholder="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="Pizza">Pizza</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Desserts">Desserts</option>
            </Select>
            <Select placeholder="Rating" value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </Select>
            <Button
              onClick={() => {
                setSelectedCity("")
                setSelectedType("")
                setSelectedCategory("")
                setSelectedRating("")
                setSearchTerm("")
              }}
            >
              Clear Filters
            </Button>
          </SimpleGrid>
        </Box>

        {/* Browse by Category */}
        <Box mb={12}>
          <Heading size="lg" mb={6}>
            Browse by Category
          </Heading>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
            {categories.map((category) => (
              <Card
                key={category.name}
                cursor="pointer"
                _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                onClick={() => setSelectedCategory(category.name)}
              >
                <CardBody textAlign="center">
                  <Center mb={4}>
                    <Icon as={category.icon} boxSize={12} color={category.color} />
                  </Center>
                  <Text fontWeight="semibold">{category.name}</Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Today's Offers */}
        {todaysOffers.length > 0 && (
          <Box mb={12}>
            <Heading size="lg" mb={6}>
              Today's Offers
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {todaysOffers.slice(0, 3).map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} showOffer />
              ))}
            </SimpleGrid>
          </Box>
        )}

        {/* Restaurant List */}
        <Box>
          <Heading size="lg" mb={6}>
            Restaurants ({filteredRestaurants.length})
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}
