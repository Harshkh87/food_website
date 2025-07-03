"use client"

import { useState } from "react"
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Image,
  Badge,
  Card,
  CardBody,
  useColorModeValue,
  IconButton,
  Collapse,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react"
import { AddIcon, MinusIcon, StarIcon } from "@chakra-ui/icons"
import { useCart } from "../contexts/CartContext"

const MenuItem = ({ item }) => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [customizations, setCustomizations] = useState({})
  const [showCustomizations, setShowCustomizations] = useState(false)

  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  const handleAddToCart = () => {
    addToCart(item, quantity, customizations)
    alert(`Added ${quantity} x ${item.name} to cart!`)
    setQuantity(1)
    setCustomizations({})
    setShowCustomizations(false)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const renderStars = (rating) => {
    return (
      <HStack spacing={1}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon key={star} boxSize={3} color={star <= rating ? "yellow.400" : "gray.300"} />
        ))}
      </HStack>
    )
  }

  return (
    <Card
      bg={cardBg}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
        borderColor: "primary.500",
      }}
      transition="all 0.3s"
      border="1px"
      borderColor={borderColor}
      overflow="hidden"
    >
      <Box position="relative" h="200px">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          w="full"
          h="full"
          objectFit="cover"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
        />
        <VStack position="absolute" top={4} left={4} spacing={2} align="start">
          <Badge colorScheme={item.veg ? "green" : "red"}>{item.veg ? "🟢 Veg" : "🔴 Non-Veg"}</Badge>
          {item.isPopular && <Badge colorScheme="orange">⭐ Popular</Badge>}
        </VStack>
        {item.originalPrice && (
          <Badge position="absolute" top={4} right={4} colorScheme="red">
            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
          </Badge>
        )}
      </Box>

      <CardBody>
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between" align="flex-start">
            <VStack align="start" spacing={1} flex={1}>
              <Heading size="md" noOfLines={1}>
                {item.name}
              </Heading>
              <HStack>
                {renderStars(item.rating)}
                <Text fontSize="sm" color="gray.600">
                  ({item.rating})
                </Text>
              </HStack>
            </VStack>
            <HStack color="gray.500" fontSize="sm">
              <Text>⏱️</Text>
              <Text>{item.prepTime}</Text>
            </HStack>
          </HStack>

          <Text color="gray.600" fontSize="sm" noOfLines={2}>
            {item.description}
          </Text>

          {item.preferences && item.preferences.length > 0 && (
            <HStack spacing={2} flexWrap="wrap">
              {item.preferences.map((pref, index) => (
                <Badge key={index} variant="subtle" colorScheme="blue" size="sm">
                  {pref}
                </Badge>
              ))}
            </HStack>
          )}

          <HStack justify="space-between" align="center">
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="700" color="primary.500">
                {formatPrice(item.price)}
              </Text>
              {item.originalPrice && (
                <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                  {formatPrice(item.originalPrice)}
                </Text>
              )}
            </VStack>

            <HStack spacing={3}>
              <HStack bg="gray.100" borderRadius="md" overflow="hidden">
                <IconButton
                  aria-label="Decrease quantity"
                  icon={<MinusIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                />
                <Text minW="30px" textAlign="center" fontWeight="600">
                  {quantity}
                </Text>
                <IconButton
                  aria-label="Increase quantity"
                  icon={<AddIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => setQuantity(quantity + 1)}
                />
              </HStack>

              <Button colorScheme="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </HStack>
          </HStack>

          {item.customizable && (
            <Button variant="outline" size="sm" onClick={() => setShowCustomizations(!showCustomizations)}>
              {showCustomizations ? "Hide Options" : "Customize"}
            </Button>
          )}

          <Collapse in={showCustomizations} animateOpacity>
            <Box p={4} bg="gray.50" borderRadius="md">
              <Heading size="sm" mb={3}>
                Customize Your Order
              </Heading>
              <FormControl>
                <FormLabel fontSize="sm">Spice Level:</FormLabel>
                <Select
                  size="sm"
                  value={customizations.spiceLevel || "medium"}
                  onChange={(e) => setCustomizations({ ...customizations, spiceLevel: e.target.value })}
                >
                  <option value="mild">Mild</option>
                  <option value="medium">Medium</option>
                  <option value="spicy">Spicy</option>
                  <option value="extra-spicy">Extra Spicy</option>
                </Select>
              </FormControl>
            </Box>
          </Collapse>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default MenuItem
