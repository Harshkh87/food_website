"use client"

import { useState } from "react"
import {
  Box,
  Grid,
  Image,
  Text,
  Badge,
  Button,
  HStack,
  VStack,
  Flex,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
} from "@chakra-ui/react"
import { ArrowLeft, Star, Clock, MapPin, Phone, ShoppingCart } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import MenuItemCard from "../components/MenuItemCard"

const menuItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces",
    price: 320,
    image: "/placeholder.svg?height=150&width=150",
    isVeg: false,
    isSpicy: true,
    isBestseller: true,
    category: "Main Course",
  },
  {
    id: 2,
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese in rich tomato gravy",
    price: 280,
    image: "/placeholder.svg?height=150&width=150",
    isVeg: true,
    isSpicy: false,
    isBestseller: true,
    category: "Main Course",
  },
  {
    id: 3,
    name: "Biryani",
    description: "Aromatic basmati rice with spices and meat",
    price: 350,
    image: "/placeholder.svg?height=150&width=150",
    isVeg: false,
    isSpicy: true,
    isBestseller: false,
    category: "Rice",
  },
  {
    id: 4,
    name: "Dal Makhani",
    description: "Creamy black lentils cooked overnight",
    price: 220,
    image: "/placeholder.svg?height=150&width=150",
    isVeg: true,
    isSpicy: false,
    isBestseller: false,
    category: "Main Course",
  },
]

const RestaurantPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, updateQuantity, getItemQuantity, getTotalItems, getTotalPrice } = useCart()

  const [vegFilter, setVegFilter] = useState("all")
  const [specialInstructions, setSpecialInstructions] = useState({})

  const restaurant = {
    id: Number.parseInt(id),
    name: "Spice Garden",
    image: "/placeholder.svg?height=300&width=600",
    rating: 4.5,
    reviews: 1250,
    cuisine: "North Indian",
    address: "123 Food Street, Delhi",
    phone: "+91 9876543210",
    timing: "11:00 AM - 11:00 PM",
    isOpen: true,
  }

  const filteredItems = menuItems.filter((item) => {
    if (vegFilter === "veg") return item.isVeg
    if (vegFilter === "nonveg") return !item.isVeg
    return true
  })

  const handleVegToggle = () => {
    if (vegFilter === "all") {
      setVegFilter("veg")
    } else if (vegFilter === "veg") {
      setVegFilter("nonveg")
    } else {
      setVegFilter("all")
    }
  }

  const getVegButtonText = () => {
    switch (vegFilter) {
      case "veg":
        return "🟢 Veg Only"
      case "nonveg":
        return "🔴 Non-Veg Only"
      default:
        return "🟢🔴 All Items"
    }
  }

  const handleAddToCart = (item) => {
    const instructions = specialInstructions[item.id] || ""
    addToCart({ ...item, specialInstructions: instructions })
  }

  const handleUpdateQuantity = (itemId, instructions, newQuantity) => {
    updateQuantity(itemId, instructions, newQuantity)
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200" position="sticky" top={0} zIndex={40}>
        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
          <Flex align="center" justify="space-between" h="16">
            <HStack spacing={4}>
              <IconButton
                aria-label="Go back"
                icon={<ArrowLeft size={20} />}
                variant="ghost"
                onClick={() => navigate("/")}
              />
              <Heading size="lg">{restaurant.name}</Heading>
            </HStack>

            <HStack spacing={4}>
              <Button onClick={handleVegToggle} variant={vegFilter === "all" ? "outline" : "solid"} size="sm">
                {getVegButtonText()}
              </Button>
              {getTotalItems() > 0 && (
                <Button leftIcon={<ShoppingCart size={16} />} position="relative" onClick={() => navigate("/cart")}>
                  Cart ({getTotalItems()})
                  <Badge position="absolute" top="-2" right="-2" colorScheme="red" borderRadius="full">
                    {getTotalItems()}
                  </Badge>
                </Button>
              )}
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* Restaurant Info */}
      <Box bg="white">
        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }} py={6}>
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
            <Image
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              w="full"
              h="64"
              objectFit="cover"
              borderRadius="lg"
            />

            <VStack align="start" spacing={4}>
              <Box>
                <Heading size="2xl">{restaurant.name}</Heading>
                <Text color="gray.600">{restaurant.cuisine}</Text>
              </Box>

              <HStack spacing={4}>
                <HStack spacing={1}>
                  <Star size={20} fill="orange" color="orange" />
                  <Text fontWeight="semibold">{restaurant.rating}</Text>
                  <Text color="gray.600">({restaurant.reviews} reviews)</Text>
                </HStack>
              </HStack>

              <VStack align="start" spacing={2}>
                <HStack spacing={2}>
                  <MapPin size={16} color="gray" />
                  <Text fontSize="sm">{restaurant.address}</Text>
                </HStack>
                <HStack spacing={2}>
                  <Clock size={16} color="gray" />
                  <Text fontSize="sm">{restaurant.timing}</Text>
                  <Badge colorScheme={restaurant.isOpen ? "green" : "gray"}>
                    {restaurant.isOpen ? "Open" : "Closed"}
                  </Badge>
                </HStack>
                <HStack spacing={2}>
                  <Phone size={16} color="gray" />
                  <Text fontSize="sm">{restaurant.phone}</Text>
                </HStack>
              </VStack>

              <Button leftIcon={<Phone size={16} />} w="full" colorScheme="orange">
                Call Restaurant
              </Button>
            </VStack>
          </Grid>
        </Box>
      </Box>

      {/* Menu */}
      <Box py={8}>
        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
          <Heading size="xl" mb={6}>
            Menu
          </Heading>

          <Tabs>
            <TabList>
              <Tab>All Items</Tab>
              <Tab>Starters</Tab>
              <Tab>Main Course</Tab>
              <Tab>Rice</Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  {filteredItems.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      quantity={getItemQuantity(item.id, specialInstructions[item.id] || "")}
                      specialInstructions={specialInstructions[item.id] || ""}
                      onAddToCart={() => handleAddToCart(item)}
                      onUpdateQuantity={(newQuantity) =>
                        handleUpdateQuantity(item.id, specialInstructions[item.id] || "", newQuantity)
                      }
                      onInstructionsChange={(instructions) =>
                        setSpecialInstructions({
                          ...specialInstructions,
                          [item.id]: instructions,
                        })
                      }
                    />
                  ))}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>

      {/* Floating Cart Button */}
      {getTotalItems() > 0 && (
        <Box position="fixed" bottom={4} right={4} zIndex={50}>
          <Button
            leftIcon={<ShoppingCart size={20} />}
            size="lg"
            borderRadius="full"
            shadow="lg"
            colorScheme="orange"
            onClick={() => navigate("/cart")}
          >
            {getTotalItems()} items | ₹{getTotalPrice()}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default RestaurantPage
