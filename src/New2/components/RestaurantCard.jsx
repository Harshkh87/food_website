"use client"

import { Card, CardBody, Image, Stack, Heading, Text, Badge, HStack, Button, useColorModeValue } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"
import { Clock, MapPin } from "lucide-react"
import { Link as RouterLink } from "react-router-dom"

export default function RestaurantCard({ restaurant, showOffer = false }) {
  const cardBg = useColorModeValue("white", "gray.800")

  return (
    <Card
      bg={cardBg}
      shadow="md"
      _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
      transition="all 0.2s"
      as={RouterLink}
      to={`/restaurant/${restaurant.id}`}
    >
      <CardBody>
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          borderRadius="lg"
          h="200px"
          w="full"
          objectFit="cover"
        />

        <Stack mt={4} spacing={3}>
          <Heading size="md">{restaurant.name}</Heading>

          <HStack>
            <MapPin size={16} />
            <Text fontSize="sm" color="gray.600">
              {restaurant.address}
            </Text>
          </HStack>

          <HStack justify="space-between">
            <HStack>
              <StarIcon color="yellow.400" />
              <Text fontWeight="semibold">{restaurant.rating}</Text>
            </HStack>
            <Badge colorScheme={restaurant.type === "Veg" ? "green" : "red"}>{restaurant.type}</Badge>
          </HStack>

          <HStack wrap="wrap" spacing={2}>
            {restaurant.features.map((feature, index) => (
              <Badge key={index} variant="outline" fontSize="xs">
                {feature}
              </Badge>
            ))}
          </HStack>

          <HStack justify="space-between" align="center">
            <HStack>
              <Clock size={16} />
              <Text fontSize="sm" color={restaurant.isOpen ? "green.500" : "red.500"}>
                {restaurant.isOpen ? "Open" : "Closed"}
              </Text>
            </HStack>
            <Text fontSize="sm">{restaurant.openingHours}</Text>
          </HStack>

          <HStack justify="space-between">
            <Text fontSize="sm">
              Min: ₹{restaurant.minOrder} | Max: ₹{restaurant.maxOrder}
            </Text>
          </HStack>

          <HStack wrap="wrap" spacing={1}>
            {restaurant.categories.map((category, index) => (
              <Badge key={index} colorScheme="orange" variant="subtle" fontSize="xs">
                {category}
              </Badge>
            ))}
          </HStack>

          {showOffer && restaurant.hasOffers && (
            <Button colorScheme="green" size="sm">
              Apply Coupon - Save 20%
            </Button>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}
