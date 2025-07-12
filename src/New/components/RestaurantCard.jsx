"use client"
import { Box, Image, Text, Badge, Button, HStack, Flex, IconButton } from "@chakra-ui/react"
import { Star, MapPin, Clock, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate()

  return (
    <Box
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
    >
      <Box position="relative">
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} w="full" h="48" objectFit="cover" />
        {restaurant.offers && (
          <Badge position="absolute" top={2} left={2} colorScheme="green">
            {restaurant.offers}
          </Badge>
        )}
        <IconButton
          aria-label="Add to favorites"
          icon={<Heart size={16} />}
          position="absolute"
          top={2}
          right={2}
          size="sm"
          variant="ghost"
          bg="whiteAlpha.800"
          _hover={{ bg: "white" }}
        />
      </Box>

      <Box p={4}>
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="bold" fontSize="lg">
            {restaurant.name}
          </Text>
          <HStack spacing={1}>
            <Star size={16} fill="orange" color="orange" />
            <Text fontSize="sm" fontWeight="medium">
              {restaurant.rating}
            </Text>
          </HStack>
        </Flex>

        <Text color="gray.600" mb={2}>
          {restaurant.cuisine}
        </Text>

        <HStack justify="space-between" fontSize="sm" color="gray.500" mb={4}>
          <HStack spacing={1}>
            <MapPin size={16} />
            <Text>{restaurant.distance}</Text>
          </HStack>
          <HStack spacing={1}>
            <Clock size={16} />
            <Text>{restaurant.time}</Text>
          </HStack>
        </HStack>

        <Flex justify="space-between" align="center">
          <Badge colorScheme={restaurant.isOpen ? "green" : "gray"}>{restaurant.isOpen ? "Open" : "Closed"}</Badge>
          <Button size="sm" colorScheme="orange" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
            View Menu
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default RestaurantCard
