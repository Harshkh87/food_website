"use client"

import { useState } from "react"
import { Box, Grid, Heading, Button, Flex } from "@chakra-ui/react"
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"
import CategoryCard from "../components/CategoryCard"
import RestaurantCard from "../components/RestaurantCard"
import Footer from "../components/Footer"

const featuredRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.5,
    cuisine: "North Indian",
    distance: "0.5 km",
    time: "25-30 min",
    isOpen: true,
    offers: "20% OFF",
  },
  {
    id: 2,
    name: "Dosa Corner",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.2,
    cuisine: "South Indian",
    distance: "1.2 km",
    time: "30-35 min",
    isOpen: true,
    offers: "Buy 1 Get 1",
  },
  {
    id: 3,
    name: "Pizza Palace",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    cuisine: "Italian",
    distance: "0.8 km",
    time: "20-25 min",
    isOpen: false,
    offers: null,
  },
]

const categories = [
  { name: "North Indian", icon: "🍛", count: 45 },
  { name: "South Indian", icon: "🥞", count: 32 },
  { name: "Chinese", icon: "🍜", count: 28 },
  { name: "Italian", icon: "🍕", count: 15 },
  { name: "Desserts", icon: "🍰", count: 22 },
  { name: "Beverages", icon: "🥤", count: 18 },
]

const OfferCard = ({ title, description, gradient }) => {
  return (
    <Box bgGradient={gradient} color="white" p={6} borderRadius="lg">
      <Heading size="lg" mb={2}>
        {title}
      </Heading>
      <Text mb={4}>{description}</Text>
      <Button variant="outline" size="sm" color="white" borderColor="white">
        Apply Now
      </Button>
    </Box>
  )
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [vegFilter, setVegFilter] = useState("all")

  const handleVegToggle = () => {
    if (vegFilter === "all") {
      setVegFilter("veg")
    } else if (vegFilter === "veg") {
      setVegFilter("nonveg")
    } else {
      setVegFilter("all")
    }
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />

      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        vegFilter={vegFilter}
        onVegToggle={handleVegToggle}
      />

      {/* Categories */}
      <Box py={8}>
        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
          <Heading size="xl" mb={6}>
            Browse by Category
          </Heading>
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(6, 1fr)",
            }}
            gap={4}
          >
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Featured Restaurants */}
      <Box py={8}>
        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="xl">Featured Restaurants</Heading>
            <Button variant="outline">View All</Button>
          </Flex>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Offers Section */}
      <Box py={8} bg="white">
        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
          <Heading size="xl" mb={6}>
            Today's Offers
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={4}
          >
            <OfferCard
              title="20% OFF"
              description="On orders above ₹500"
              gradient="linear(to-r, green.400, green.600)"
            />
            <OfferCard
              title="Buy 1 Get 1"
              description="On selected items"
              gradient="linear(to-r, blue.400, blue.600)"
            />
            <OfferCard
              title="Free Delivery"
              description="No minimum order"
              gradient="linear(to-r, purple.400, purple.600)"
            />
          </Grid>
        </Box>
      </Box>

      <Footer />
    </Box>
  )
}

export default HomePage
