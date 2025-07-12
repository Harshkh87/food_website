"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom"
import {
  ChakraProvider,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  Grid,
  GridItem,
  Card,
  CardBody,
  VStack,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  Spinner,
  Center,
  Input,
  Select,
  Checkbox,
  FormControl,
  FormLabel,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons"
import theme from "../theme/index"
import { CartProvider } from "../contexts/CartContext"
import CartIcon from "../components/CartIcon"
import ShoppingCart from "../components/ShoppingCart"
import MenuFilters from "../components/MenuFilters"
import MenuSection from "../components/MenuSection"
import RestaurantServices from "../components/RestaurantServices"
import ReviewsSection from "../components/ReviewsSection"
import FoodCategorySection from "../components/FoodCategorySection"
import LoadingAnimation from "../components/LoadingAnimation"
import PageTransition from "../components/PageTransition"

// Enhanced mock data with more realistic content
const mockRestaurants = [
  {
    id: 1,
    name: "Spice Garden",
    city: "Mumbai",
    cuisine: "Indian",
    type: "Veg",
    tags: ["fast delivery", "family-friendly"],
    rating: 4.5,
    deliveryTime: "25-30 min",
    deliveryFee: 29,
    image: "/placeholder.svg?height=300&width=400",
    address: "123 Main St, Andheri West, Mumbai",
    phone: "+91 9876543210",
    isOpen: true,
    offers: [
      { id: 1, title: "20% Off on Orders Above ₹500", code: "SAVE20", discount: 20 },
      { id: 2, title: "Free Delivery on First Order", code: "FREEDEL", discount: 0 },
    ],
    foodItems: [
      {
        id: 1,
        name: "Butter Chicken",
        price: 299,
        originalPrice: 349,
        veg: false,
        category: "mains",
        image: "/placeholder.svg?height=200&width=300",
        description: "Creamy tomato-based curry with tender chicken pieces, served with aromatic basmati rice",
        preferences: ["spicy"],
        rating: 4.6,
        isPopular: true,
        prepTime: "15-20 min",
        reviews: [
          { id: 1, user: "Rahul S.", rating: 5, comment: "Amazing taste! Perfect spice level.", date: "2024-01-15" },
          { id: 2, user: "Priya K.", rating: 4, comment: "Good but could be less oily.", date: "2024-01-10" },
        ],
      },
      {
        id: 2,
        name: "Paneer Tikka",
        price: 249,
        veg: true,
        category: "appetizers",
        image: "/placeholder.svg?height=200&width=300",
        description: "Grilled cottage cheese marinated in aromatic spices and yogurt",
        preferences: ["spicy", "vegan"],
        rating: 4.4,
        prepTime: "10-15 min",
        reviews: [
          { id: 1, user: "Amit P.", rating: 4, comment: "Fresh and well-marinated paneer.", date: "2024-01-12" },
        ],
      },
      {
        id: 3,
        name: "Biryani",
        price: 199,
        veg: false,
        category: "mains",
        image: "/placeholder.svg?height=200&width=300",
        description: "Fragrant basmati rice layered with tender meat and aromatic spices",
        preferences: ["spicy"],
        rating: 4.8,
        isPopular: true,
        prepTime: "25-30 min",
        reviews: [{ id: 1, user: "Neha M.", rating: 5, comment: "Best biryani in the city!", date: "2024-01-14" }],
      },
      {
        id: 4,
        name: "Dal Makhani",
        price: 179,
        veg: true,
        category: "mains",
        image: "/placeholder.svg?height=200&width=300",
        description: "Rich and creamy black lentils slow-cooked overnight with butter and cream",
        preferences: ["vegan"],
        rating: 4.3,
        prepTime: "15-20 min",
        reviews: [],
      },
      {
        id: 5,
        name: "Gulab Jamun",
        price: 99,
        veg: true,
        category: "desserts",
        image: "/placeholder.svg?height=200&width=300",
        description: "Soft milk dumplings soaked in rose-flavored sugar syrup",
        preferences: [],
        rating: 4.5,
        prepTime: "5 min",
        reviews: [{ id: 1, user: "Sanjay R.", rating: 5, comment: "Perfect sweetness level!", date: "2024-01-13" }],
      },
      {
        id: 6,
        name: "Masala Chai",
        price: 49,
        veg: true,
        category: "beverages",
        image: "/placeholder.svg?height=200&width=300",
        description: "Traditional Indian spiced tea brewed with aromatic herbs and spices",
        preferences: ["vegan"],
        rating: 4.2,
        prepTime: "5 min",
        reviews: [],
      },
    ],
  },
  {
    id: 2,
    name: "Dragon Palace",
    city: "Delhi",
    cuisine: "Chinese",
    type: "Non-Veg",
    tags: ["fast delivery"],
    rating: 4.2,
    deliveryTime: "30-35 min",
    deliveryFee: 35,
    image: "/placeholder.svg?height=300&width=400",
    address: "456 China Town, Connaught Place, Delhi",
    phone: "+91 9876543211",
    isOpen: true,
    offers: [{ id: 1, title: "Buy 2 Get 1 Free on Appetizers", code: "B2G1", discount: 0 }],
    foodItems: [
      {
        id: 1,
        name: "Chicken Manchurian",
        price: 279,
        veg: false,
        category: "mains",
        image: "/placeholder.svg?height=200&width=300",
        description: "Crispy chicken balls tossed in tangy Manchurian sauce with bell peppers",
        preferences: ["spicy"],
        rating: 4.3,
        prepTime: "20-25 min",
        reviews: [
          {
            id: 1,
            user: "Vikram S.",
            rating: 4,
            comment: "Good taste but portion could be bigger.",
            date: "2024-01-11",
          },
        ],
      },
      {
        id: 2,
        name: "Veg Fried Rice",
        price: 199,
        veg: true,
        category: "mains",
        image: "/placeholder.svg?height=200&width=300",
        description: "Wok-tossed rice with fresh vegetables and aromatic sauces",
        preferences: ["vegan"],
        rating: 4.1,
        prepTime: "15-20 min",
        reviews: [],
      },
      {
        id: 3,
        name: "Sweet & Sour Pork",
        price: 329,
        veg: false,
        category: "mains",
        image: "/placeholder.svg?height=200&width=300",
        description: "Tender pork pieces in a perfect balance of sweet and tangy sauce",
        preferences: [],
        rating: 4.4,
        isPopular: true,
        prepTime: "25-30 min",
        reviews: [],
      },
    ],
  },
  {
    id: 3,
    name: "Mama Mia",
    city: "Bangalore",
    cuisine: "Italian",
    type: "Veg",
    tags: ["family-friendly"],
    rating: 4.7,
    deliveryTime: "20-25 min",
    deliveryFee: 25,
    image: "/placeholder.svg?height=300&width=400",
    address: "789 Italian Street, Koramangala, Bangalore",
    phone: "+91 9876543212",
    isOpen: false,
    offers: [{ id: 1, title: "30% Off on Pizza Combos", code: "PIZZA30", discount: 30 }],
    foodItems: [
      {
        id: 1,
        name: "Margherita Pizza",
        price: 399,
        veg: true,
        category: "mains",
        image: "/placeholder.svg?height=200&width=300",
        description: "Classic pizza with fresh mozzarella, tomato sauce, and aromatic basil leaves",
        preferences: ["gluten-free"],
        rating: 4.7,
        isPopular: true,
        prepTime: "15-20 min",
        reviews: [{ id: 1, user: "Maria L.", rating: 5, comment: "Authentic Italian taste!", date: "2024-01-16" }],
      },
      {
        id: 2,
        name: "Pasta Alfredo",
        price: 349,
        veg: true,
        category: "mains",
        image: "/placeholder.svg?height=200&width=300",
        description: "Creamy white sauce pasta with herbs, garlic, and parmesan cheese",
        preferences: [],
        rating: 4.5,
        prepTime: "20-25 min",
        reviews: [],
      },
      {
        id: 3,
        name: "Garlic Bread",
        price: 149,
        veg: true,
        category: "appetizers",
        image: "/placeholder.svg?height=200&width=300",
        description: "Crispy bread topped with garlic butter, herbs, and melted cheese",
        preferences: ["vegan"],
        rating: 4.3,
        prepTime: "10 min",
        reviews: [],
      },
    ],
  },
]

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Restaurant Owner",
    message:
      "This platform helped me increase my restaurant's visibility by 300%. The analytics and customer insights are incredible!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Food Enthusiast",
    message: "Love the variety of restaurants and the seamless ordering process. The app is so intuitive and fast!",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Ahmed Ali",
    role: "Restaurant Owner",
    message: "The premium plan features really helped boost our sales. Customer support is outstanding too!",
    rating: 4,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

// Header Component with Chakra UI
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Box
      as="header"
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={100}
      backdropFilter="blur(10px)"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" py={4}>
          <Link to="/">
            <HStack spacing={2}>
              <Text fontSize="2xl">🍽️</Text>
              <Heading size="lg" bgGradient="linear(to-r, primary.500, accent.500)" bgClip="text">
                FoodieHub
              </Heading>
            </HStack>
          </Link>

          <HStack spacing={8} display={{ base: "none", md: "flex" }}>
            <Link to="/">
              <Text fontWeight="500" _hover={{ color: "primary.500" }}>
                Home
              </Text>
            </Link>
            <Link to="/add-restaurant">
              <Text fontWeight="500" _hover={{ color: "primary.500" }}>
                Partner with us
              </Text>
            </Link>
            <Link to="/premium-plans">
              <Text fontWeight="500" _hover={{ color: "primary.500" }}>
                Premium Plans
              </Text>
            </Link>
            <Link to="/contact">
              <Text fontWeight="500" _hover={{ color: "primary.500" }}>
                Contact
              </Text>
            </Link>
          </HStack>

          <HStack spacing={4}>
            <CartIcon />
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
            />
            <IconButton
              aria-label="Toggle menu"
              icon={<HamburgerIcon />}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              display={{ base: "flex", md: "none" }}
              variant="ghost"
            />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

// Enhanced Restaurant Card Component
const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate()
  const cardBg = useColorModeValue("white", "gray.800")

  return (
    <Card
      bg={cardBg}
      cursor="pointer"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
        borderColor: "primary.500",
      }}
      transition="all 0.3s"
      overflow="hidden"
    >
      <Box position="relative" h="200px">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
        />
        <Badge position="absolute" top={4} left={4} colorScheme={restaurant.isOpen ? "green" : "red"}>
          {restaurant.isOpen ? "Open" : "Closed"}
        </Badge>
        {restaurant.offers && restaurant.offers.length > 0 && (
          <Badge position="absolute" top={4} right={4} colorScheme="orange">
            {restaurant.offers[0].discount > 0 ? `${restaurant.offers[0].discount}% OFF` : "OFFER"}
          </Badge>
        )}
      </Box>

      <CardBody>
        <Flex justify="space-between" align="flex-start" mb={2}>
          <Heading size="md" color="gray.800">
            {restaurant.name}
          </Heading>
          <HStack>
            <Text>⭐</Text>
            <Text fontWeight="600" color="green.600">
              {restaurant.rating}
            </Text>
          </HStack>
        </Flex>

        <Text color="gray.600" fontSize="sm" mb={1}>
          {restaurant.cuisine} • {restaurant.type}
        </Text>
        <Text color="gray.500" fontSize="sm" mb={4}>
          {restaurant.city}
        </Text>

        <Flex justify="space-between" align="center" mb={4}>
          <HStack spacing={4}>
            <Text fontSize="sm" color="gray.600">
              🕒 {restaurant.deliveryTime}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {restaurant.deliveryFee === 0 ? "Free delivery" : `₹${restaurant.deliveryFee} delivery`}
            </Text>
          </HStack>
        </Flex>

        <HStack spacing={2} flexWrap="wrap">
          {restaurant.tags.map((tag, index) => (
            <Badge key={index} variant="subtle" colorScheme="gray" size="sm">
              {tag}
            </Badge>
          ))}
        </HStack>
      </CardBody>
    </Card>
  )
}

// Enhanced Filter Section
const FilterSection = ({ filters, onFilterChange }) => {
  const cardBg = useColorModeValue("white", "gray.800")

  return (
    <Card bg={cardBg} p={6}>
      <Heading size="md" mb={6}>
        Filters
      </Heading>

      <VStack spacing={6} align="stretch">
        <FormControl>
          <FormLabel>City</FormLabel>
          <Select
            value={filters.city}
            onChange={(e) => onFilterChange("city", e.target.value)}
            placeholder="All Cities"
          >
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Cuisine</FormLabel>
          <Select
            value={filters.cuisine}
            onChange={(e) => onFilterChange("cuisine", e.target.value)}
            placeholder="All Cuisines"
          >
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Italian">Italian</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select value={filters.type} onChange={(e) => onFilterChange("type", e.target.value)} placeholder="All Types">
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Quick Filters</FormLabel>
          <VStack align="start" spacing={3}>
            <Checkbox
              isChecked={filters.fastDelivery}
              onChange={(e) => onFilterChange("fastDelivery", e.target.checked)}
            >
              Fast Delivery
            </Checkbox>
            <Checkbox
              isChecked={filters.familyFriendly}
              onChange={(e) => onFilterChange("familyFriendly", e.target.checked)}
            >
              Family Friendly
            </Checkbox>
          </VStack>
        </FormControl>
      </VStack>
    </Card>
  )
}

// Enhanced Homepage Component
const Homepage = () => {
  const [restaurants, setRestaurants] = useState(mockRestaurants)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    city: "",
    cuisine: "",
    type: "",
    fastDelivery: false,
    familyFriendly: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const heroBg = useColorModeValue("gray.50", "gray.900")
  const overlayBg = useColorModeValue("rgba(255, 255, 255, 0.95)", "rgba(0, 0, 0, 0.8)")

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = !filters.city || restaurant.city === filters.city
    const matchesCuisine = !filters.cuisine || restaurant.cuisine === filters.cuisine
    const matchesType = !filters.type || restaurant.type === filters.type
    const matchesFastDelivery = !filters.fastDelivery || restaurant.tags.includes("fast delivery")
    const matchesFamilyFriendly = !filters.familyFriendly || restaurant.tags.includes("family-friendly")

    return matchesSearch && matchesCity && matchesCuisine && matchesType && matchesFastDelivery && matchesFamilyFriendly
  })

  return (
    <Box>
      {/* Hero Section */}
      <Box position="relative" minH="70vh" bg={heroBg} display="flex" alignItems="center" overflow="hidden">
        <Box position="absolute" inset={0} bgGradient="linear(135deg, primary.500, accent.500)" opacity={0.1} />
        <Box position="absolute" inset={0} bg={overlayBg} />

        <Container maxW="container.xl" position="relative" zIndex={2}>
          <VStack spacing={8} textAlign="center" maxW="800px" mx="auto">
            <VStack spacing={4}>
              <Heading size="2xl" fontWeight="700" bgGradient="linear(135deg, gray.800, gray.600)" bgClip="text">
                Discover Amazing Food
              </Heading>
              <Text fontSize="xl" color="gray.600">
                Order from the best restaurants in your city
              </Text>
            </VStack>

            <Box w="full" maxW="600px">
              <HStack bg="white" border="1px" borderColor="gray.200" borderRadius="3xl" p={2} boxShadow="lg">
                <Text px={4} color="gray.500" fontSize="xl">
                  🔍
                </Text>
                <Input
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  border="none"
                  _focus={{ boxShadow: "none" }}
                />
                <Button size="lg" borderRadius="2xl">
                  Search
                </Button>
              </HStack>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              <VStack>
                <Text fontSize="2xl" fontWeight="700" color="primary.500">
                  1000+
                </Text>
                <Text color="gray.600">Restaurants</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="700" color="primary.500">
                  50K+
                </Text>
                <Text color="gray.600">Happy Customers</Text>
              </VStack>
              <VStack>
                <Text fontSize="2xl" fontWeight="700" color="primary.500">
                  25+
                </Text>
                <Text color="gray.600">Cities</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Food Category Section */}
      <FoodCategorySection
        onCategorySelect={(category) => {
          console.log("Selected category:", category)
          // You can add filtering logic here
        }}
      />

      {/* Main Content */}
      <Container maxW="container.xl" py={16}>
        <Grid templateColumns={{ base: "1fr", lg: "300px 1fr" }} gap={8}>
          <GridItem>
            <Box position="sticky" top="120px">
              <FilterSection filters={filters} onFilterChange={handleFilterChange} />
            </Box>
          </GridItem>

          <GridItem>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading size="lg" mb={2}>
                  Restaurants near you
                </Heading>
                <Text color="gray.600">({filteredRestaurants.length} found)</Text>
              </Box>

              {isLoading ? (
                <Center py={16}>
                  <Spinner size="xl" color="primary.500" />
                </Center>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </SimpleGrid>
              )}

              {filteredRestaurants.length === 0 && !isLoading && (
                <Center py={16}>
                  <VStack spacing={4}>
                    <Text fontSize="4xl">🍽️</Text>
                    <Heading size="md">No restaurants found</Heading>
                    <Text color="gray.600">Try adjusting your filters or search terms</Text>
                  </VStack>
                </Center>
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

// Enhanced Restaurant Detail Component
const RestaurantDetail = () => {
  const { id } = useParams()
  const restaurant = mockRestaurants.find((r) => r.id === Number.parseInt(id))
  const [filteredItems, setFilteredItems] = useState(restaurant?.foodItems || [])
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
    preferences: [],
  })

  const cardBg = useColorModeValue("white", "gray.800")

  const handleFilterChange = (newFilters) => {
    let filtered = restaurant.foodItems

    if (newFilters.search) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(newFilters.search.toLowerCase()) ||
          item.description.toLowerCase().includes(newFilters.search.toLowerCase()),
      )
    }

    if (newFilters.category) {
      filtered = filtered.filter((item) => item.category === newFilters.category)
    }

    if (newFilters.type) {
      if (newFilters.type === "veg") {
        filtered = filtered.filter((item) => item.veg === true)
      } else if (newFilters.type === "non-veg") {
        filtered = filtered.filter((item) => item.veg === false)
      }
    }

    if (newFilters.preferences.length > 0) {
      filtered = filtered.filter((item) => newFilters.preferences.some((pref) => item.preferences.includes(pref)))
    }

    setFilteredItems(filtered)
    setFilters(newFilters)
  }

  if (!restaurant) {
    return (
      <Container maxW="container.xl" py={16}>
        <Center>
          <VStack spacing={4}>
            <Heading size="lg">Restaurant not found</Heading>
            <Text>The restaurant you're looking for doesn't exist.</Text>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </VStack>
        </Center>
      </Container>
    )
  }

  // Group menu items by category
  const menuCategories = filteredItems.reduce((acc, item) => {
    const category = item.category || "Other"
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(item)
    return acc
  }, {})

  // Enhanced reviews data
  const enhancedReviews = restaurant.foodItems.flatMap(
    (item) =>
      item.reviews?.map((review) => ({
        ...review,
        date: review.date || "2024-01-15",
        title: `Great ${item.name}!`,
        helpful: Math.floor(Math.random() * 10) + 1,
      })) || [],
  )

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Restaurant Header */}
        <Card bg={cardBg} overflow="hidden">
          <Grid templateColumns={{ base: "1fr", lg: "400px 1fr" }} gap={8}>
            <Box position="relative" h="300px">
              <Image
                src={restaurant.image || "/placeholder.svg"}
                alt={restaurant.name}
                w="full"
                h="full"
                objectFit="cover"
              />
              <Badge position="absolute" top={4} right={4} colorScheme={restaurant.isOpen ? "green" : "red"} size="lg">
                {restaurant.isOpen ? "🟢 Open Now" : "🔴 Closed"}
              </Badge>
            </Box>

            <CardBody>
              <VStack align="start" spacing={4}>
                <Flex justify="space-between" w="full" align="flex-start">
                  <Heading size="xl">{restaurant.name}</Heading>
                  <HStack bg="green.100" px={3} py={2} borderRadius="lg">
                    <Text>⭐</Text>
                    <Text fontWeight="600" color="green.800">
                      {restaurant.rating}
                    </Text>
                    <Text fontSize="sm" color="green.600">
                      (500+ reviews)
                    </Text>
                  </HStack>
                </Flex>

                <VStack align="start" spacing={2}>
                  <Text fontSize="lg" color="gray.600">
                    {restaurant.cuisine} • {restaurant.type}
                  </Text>
                  <Text color="gray.600">📍 {restaurant.address}</Text>
                  <Text color="gray.600">📞 {restaurant.phone}</Text>

                  <HStack spacing={6}>
                    <HStack>
                      <Text>🕒</Text>
                      <Text>{restaurant.deliveryTime}</Text>
                    </HStack>
                    <HStack>
                      <Text>🚚</Text>
                      <Text>
                        {restaurant.deliveryFee === 0 ? "Free delivery" : `₹${restaurant.deliveryFee} delivery`}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>

                <HStack spacing={2} flexWrap="wrap">
                  {restaurant.tags.map((tag, index) => (
                    <Badge key={index} variant="subtle" colorScheme="blue">
                      {tag}
                    </Badge>
                  ))}
                </HStack>
              </VStack>
            </CardBody>
          </Grid>
        </Card>

        {/* Offers Section */}
        {restaurant.offers && restaurant.offers.length > 0 && (
          <Card bg="orange.50" borderColor="orange.200" p={6}>
            <Heading size="md" mb={4}>
              🎉 Available Offers
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              {restaurant.offers.map((offer) => (
                <Flex
                  key={offer.id}
                  justify="space-between"
                  align="center"
                  bg="white"
                  p={4}
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  <Box>
                    <Text fontWeight="600" mb={1}>
                      {offer.title}
                    </Text>
                    <Text fontSize="sm" color="primary.600">
                      Use code:{" "}
                      <Text as="span" fontWeight="600">
                        {offer.code}
                      </Text>
                    </Text>
                  </Box>
                  <Button size="sm" variant="outline">
                    Apply
                  </Button>
                </Flex>
              ))}
            </SimpleGrid>
          </Card>
        )}

        {/* Restaurant Services */}
        <RestaurantServices restaurant={restaurant} />

        {/* Menu Section */}
        <Box>
          <VStack spacing={6} align="center" mb={8}>
            <Heading size="lg">Our Menu</Heading>
            <Text color="gray.600">Discover our delicious offerings</Text>
          </VStack>

          <MenuFilters filters={filters} onFilterChange={handleFilterChange} />

          <Box mt={8}>
            {Object.keys(menuCategories).length > 0 ? (
              <VStack spacing={6} align="stretch">
                {Object.entries(menuCategories).map(([category, items]) => (
                  <MenuSection key={category} category={category} items={items} restaurantInfo={restaurant} />
                ))}
              </VStack>
            ) : (
              <Center py={16}>
                <VStack spacing={4}>
                  <Text fontSize="4xl">🍽️</Text>
                  <Heading size="md">No menu items found</Heading>
                  <Text color="gray.600">Try adjusting your filters</Text>
                </VStack>
              </Center>
            )}
          </Box>
        </Box>

        {/* Reviews Section */}
        <ReviewsSection reviews={enhancedReviews} restaurantId={restaurant.id} restaurantName={restaurant.name} />
      </VStack>
    </Container>
  )
}

// Keep other components (AddRestaurant, PremiumPlans, Contact) with Chakra UI styling
const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    cuisine: "",
    type: "Veg",
    phone: "",
    email: "",
    foodItems: [{ name: "", price: "", veg: true }],
  })

  const cardBg = useColorModeValue("white", "gray.800")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFoodItemChange = (index, field, value) => {
    const updatedItems = [...formData.foodItems]
    updatedItems[index][field] = value
    setFormData((prev) => ({
      ...prev,
      foodItems: updatedItems,
    }))
  }

  const addFoodItem = () => {
    setFormData((prev) => ({
      ...prev,
      foodItems: [...prev.foodItems, { name: "", price: "", veg: true }],
    }))
  }

  const removeFoodItem = (index) => {
    const updatedItems = formData.foodItems.filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      foodItems: updatedItems,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Restaurant added successfully! (This is a demo)")
    console.log("Restaurant data:", formData)
  }

  return (
    <Container maxW="container.lg" py={16}>
      <VStack spacing={8} align="center" mb={12}>
        <Heading size="xl">Partner with FoodieHub</Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Join thousands of restaurants growing their business with us
        </Text>
      </VStack>

      <Card bg={cardBg} p={8}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading size="md" mb={6}>
                Restaurant Details
              </Heading>
              <VStack spacing={6} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Restaurant Name</FormLabel>
                  <Input name="name" value={formData.name} onChange={handleInputChange} />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Address</FormLabel>
                  <Input name="address" value={formData.address} onChange={handleInputChange} />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Select name="city" value={formData.city} onChange={handleInputChange} placeholder="Select City">
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Kolkata">Kolkata</option>
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Cuisine Type</FormLabel>
                    <Select
                      name="cuisine"
                      value={formData.cuisine}
                      onChange={handleInputChange}
                      placeholder="Select Cuisine"
                    >
                      <option value="Indian">Indian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Italian">Italian</option>
                      <option value="Mexican">Mexican</option>
                      <option value="Thai">Thai</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel>Restaurant Type</FormLabel>
                    <Select name="type" value={formData.type} onChange={handleInputChange}>
                      <option value="Veg">Pure Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                      <option value="Both">Both Veg & Non-Veg</option>
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </FormControl>
              </VStack>
            </Box>

            <Divider />

            <Box>
              <Heading size="md" mb={6}>
                Menu Items
              </Heading>
              <VStack spacing={4} align="stretch">
                {formData.foodItems.map((item, index) => (
                  <Card key={index} p={4} bg="gray.50">
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                      <FormControl isRequired>
                        <FormLabel>Item Name</FormLabel>
                        <Input
                          value={item.name}
                          onChange={(e) => handleFoodItemChange(index, "name", e.target.value)}
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Price (₹)</FormLabel>
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleFoodItemChange(index, "price", e.target.value)}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Flex align="center" justify="space-between">
                          <Select
                            value={item.veg}
                            onChange={(e) => handleFoodItemChange(index, "veg", e.target.value === "true")}
                          >
                            <option value={true}>Veg</option>
                            <option value={false}>Non-Veg</option>
                          </Select>
                          {formData.foodItems.length > 1 && (
                            <Button
                              ml={4}
                              size="sm"
                              colorScheme="red"
                              variant="outline"
                              onClick={() => removeFoodItem(index)}
                            >
                              Remove
                            </Button>
                          )}
                        </Flex>
                      </FormControl>
                    </SimpleGrid>
                  </Card>
                ))}

                <Button variant="outline" onClick={addFoodItem}>
                  Add Another Item
                </Button>
              </VStack>
            </Box>

            <Button type="submit" size="lg" w="full">
              Add Restaurant
            </Button>
          </VStack>
        </form>
      </Card>
    </Container>
  )
}

const PremiumPlans = () => {
  const cardBg = useColorModeValue("white", "gray.800")

  const plans = [
    {
      name: "Basic",
      price: "₹999",
      period: "/month",
      features: ["Basic listing", "Up to 20 menu items", "Customer reviews", "Basic support", "Mobile app listing"],
      popular: false,
    },
    {
      name: "Standard",
      price: "₹1,999",
      period: "/month",
      features: [
        "Highlighted listing",
        "Unlimited menu items",
        "Photo gallery",
        "Basic analytics",
        "Priority support",
        "Social media promotion",
        "Featured in search",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "₹3,999",
      period: "/month",
      features: [
        "Priority listing",
        "Featured promotions",
        "Advanced analytics",
        "Custom branding",
        "24/7 dedicated support",
        "Marketing campaigns",
        "Homepage banner ads",
        "Customer insights",
      ],
      popular: false,
    },
  ]

  return (
    <Container maxW="container.xl" py={16}>
      <VStack spacing={8} align="center" mb={12}>
        <Heading size="xl">Choose Your Plan</Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Grow your restaurant business with our premium features
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
        {plans.map((plan, index) => (
          <Card
            key={index}
            bg={cardBg}
            position="relative"
            borderColor={plan.popular ? "primary.500" : "gray.200"}
            borderWidth={plan.popular ? "2px" : "1px"}
            _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
            transition="all 0.3s"
          >
            {plan.popular && (
              <Badge
                position="absolute"
                top="-10px"
                left="50%"
                transform="translateX(-50%)"
                colorScheme="primary"
                px={4}
                py={1}
                borderRadius="full"
              >
                Most Popular
              </Badge>
            )}

            <CardBody textAlign="center">
              <VStack spacing={6}>
                <Heading size="lg">{plan.name}</Heading>

                <HStack>
                  <Text fontSize="3xl" fontWeight="700" color="primary.500">
                    {plan.price}
                  </Text>
                  <Text color="gray.600">{plan.period}</Text>
                </HStack>

                <VStack spacing={3} align="start" w="full">
                  {plan.features.map((feature, idx) => (
                    <HStack key={idx}>
                      <Text color="green.500">✓</Text>
                      <Text>{feature}</Text>
                    </HStack>
                  ))}
                </VStack>

                <Button
                  w="full"
                  size="lg"
                  colorScheme={plan.popular ? "primary" : "gray"}
                  variant={plan.popular ? "solid" : "outline"}
                >
                  Choose Plan
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <VStack spacing={12}>
        <Box textAlign="center">
          <Heading size="lg" mb={8}>
            Why Choose FoodieHub?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            <VStack>
              <Text fontSize="3xl">🎯</Text>
              <Heading size="md">Increased Visibility</Heading>
              <Text color="gray.600" textAlign="center">
                Get discovered by thousands of hungry customers in your area
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="3xl">👥</Text>
              <Heading size="md">Targeted Customer Base</Heading>
              <Text color="gray.600" textAlign="center">
                Reach customers who are actively looking for your cuisine type
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="3xl">📈</Text>
              <Heading size="md">Premium Promotions</Heading>
              <Text color="gray.600" textAlign="center">
                Feature your restaurant in prime locations and special campaigns
              </Text>
            </VStack>
            <VStack>
              <Text fontSize="3xl">🚀</Text>
              <Heading size="md">Simple Onboarding</Heading>
              <Text color="gray.600" textAlign="center">
                Get started in minutes with our easy-to-use restaurant dashboard
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>

        <Box textAlign="center" w="full">
          <Heading size="lg" mb={8}>
            What Our Partners Say
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} bg={cardBg} p={6}>
                <VStack spacing={4}>
                  <HStack>
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Text key={i} color="yellow.400">
                        ⭐
                      </Text>
                    ))}
                  </HStack>
                  <Text fontStyle="italic" textAlign="center">
                    "{testimonial.message}"
                  </Text>
                  <VStack spacing={1}>
                    <Text fontWeight="600">{testimonial.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {testimonial.role}
                    </Text>
                  </VStack>
                </VStack>
              </Card>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const cardBg = useColorModeValue("white", "gray.800")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Message sent successfully! We will get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <Container maxW="container.lg" py={16}>
      <VStack spacing={8} align="center" mb={12}>
        <Heading size="xl">Get In Touch</Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          We'd love to hear from you
        </Text>
      </VStack>

      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12}>
        <Card bg={cardBg} p={8}>
          <VStack spacing={6} align="start">
            <Heading size="md">Contact Information</Heading>

            <VStack spacing={4} align="start">
              <VStack align="start" spacing={1}>
                <Heading size="sm">📧 Email</Heading>
                <Text color="gray.600">info@foodiehub.com</Text>
              </VStack>

              <VStack align="start" spacing={1}>
                <Heading size="sm">📞 Phone</Heading>
                <Text color="gray.600">+91 9876543210</Text>
              </VStack>

              <VStack align="start" spacing={1}>
                <Heading size="sm">📍 Address</Heading>
                <Text color="gray.600">123 Food Street, Tech City, India 560001</Text>
              </VStack>

              <VStack align="start" spacing={1}>
                <Heading size="sm">🕒 Business Hours</Heading>
                <Text color="gray.600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </Text>
              </VStack>
            </VStack>
          </VStack>
        </Card>

        <Card bg={cardBg} p={8}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <Heading size="md">Send us a Message</Heading>

              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <Input as="textarea" rows={5} name="message" value={formData.message} onChange={handleInputChange} />
              </FormControl>

              <Button type="submit" size="lg" w="full">
                Send Message
              </Button>
            </VStack>
          </form>
        </Card>
      </Grid>
    </Container>
  )
}

// Footer Component
const Footer = () => {
  const bg = useColorModeValue("gray.50", "gray.900")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Box as="footer" bg={bg} borderTop="1px" borderColor={borderColor} py={12} mt={16}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8} mb={8}>
          <VStack align="start" spacing={4}>
            <HStack spacing={2}>
              <Text fontSize="2xl">🍽️</Text>
              <Heading size="lg" bgGradient="linear(to-r, primary.500, accent.500)" bgClip="text">
                FoodieHub
              </Heading>
            </HStack>
            <Text color="gray.600">Your one-stop destination for delicious food from the best restaurants.</Text>
            <HStack spacing={4}>
              <Text fontSize="xl" cursor="pointer" _hover={{ color: "primary.500" }}>
                📘
              </Text>
              <Text fontSize="xl" cursor="pointer" _hover={{ color: "primary.500" }}>
                📷
              </Text>
              <Text fontSize="xl" cursor="pointer" _hover={{ color: "primary.500" }}>
                🐦
              </Text>
            </HStack>
          </VStack>

          <VStack align="start" spacing={4}>
            <Heading size="md">Quick Links</Heading>
            <VStack align="start" spacing={2}>
              <Link to="/">
                <Text _hover={{ color: "primary.500" }}>Home</Text>
              </Link>
              <Link to="/add-restaurant">
                <Text _hover={{ color: "primary.500" }}>Partner with us</Text>
              </Link>
              <Link to="/premium-plans">
                <Text _hover={{ color: "primary.500" }}>Premium Plans</Text>
              </Link>
              <Link to="/contact">
                <Text _hover={{ color: "primary.500" }}>Contact</Text>
              </Link>
            </VStack>
          </VStack>

          <VStack align="start" spacing={4}>
            <Heading size="md">Contact Info</Heading>
            <VStack align="start" spacing={2}>
              <Text color="gray.600">📧 info@foodiehub.com</Text>
              <Text color="gray.600">📞 +91 9876543210</Text>
              <Text color="gray.600">📍 123 Food Street, Tech City</Text>
            </VStack>
          </VStack>
        </Grid>

        <Divider mb={4} />
        <Text textAlign="center" color="gray.600">
          &copy; 2024 FoodieHub. All rights reserved.
        </Text>
      </Container>
    </Box>
  )
}

// Main App Component
const App = () => {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    // Hide loading animation after 3 seconds
    const timer = setTimeout(() => {
      setShowLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Router>
          <PageTransition>
            <LoadingAnimation isVisible={showLoading} onComplete={() => setShowLoading(false)} />
            <Box minH="100vh">
              <Header />
              <ShoppingCart />
              <Box as="main">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                  <Route path="/add-restaurant" element={<AddRestaurant />} />
                  <Route path="/premium-plans" element={<PremiumPlans />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </PageTransition>
        </Router>
      </CartProvider>
    </ChakraProvider>
  )
}

export default App
