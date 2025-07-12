"use client"
import { Box, Image, Text, Badge, Button, HStack, VStack, Flex, IconButton, Input } from "@chakra-ui/react"
import { Plus, Minus, Heart } from "lucide-react"

const MenuItemCard = ({ item, quantity, specialInstructions, onAddToCart, onUpdateQuantity, onInstructionsChange }) => {
  return (
    <Box bg="white" p={4} borderRadius="lg" shadow="sm" transition="all 0.2s" _hover={{ shadow: "md" }}>
      <HStack spacing={4} align="start">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          w="24"
          h="24"
          objectFit="cover"
          borderRadius="lg"
        />

        <VStack flex={1} align="start" spacing={2}>
          <HStack spacing={2} align="center">
            <Box w={3} h={3} borderRadius="full" bg={item.isVeg ? "green.500" : "red.500"} />
            <Text fontWeight="semibold">{item.name}</Text>
            {item.isBestseller && (
              <Badge colorScheme="orange" size="sm">
                Bestseller
              </Badge>
            )}
            {item.isSpicy && <Text>🌶️</Text>}
          </HStack>

          <Text fontSize="sm" color="gray.600">
            {item.description}
          </Text>

          <Text fontWeight="bold" fontSize="lg">
            ₹{item.price}
          </Text>

          <Input
            placeholder="Special instructions (e.g., less spicy, extra cheese)"
            value={specialInstructions}
            onChange={(e) => onInstructionsChange(e.target.value)}
            size="sm"
          />

          <Flex justify="space-between" align="center" w="full">
            {quantity > 0 ? (
              <HStack spacing={2}>
                <IconButton
                  aria-label="Decrease quantity"
                  icon={<Minus size={16} />}
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(quantity - 1)}
                />
                <Text fontWeight="semibold" minW="8" textAlign="center">
                  {quantity}
                </Text>
                <IconButton
                  aria-label="Increase quantity"
                  icon={<Plus size={16} />}
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(quantity + 1)}
                />
              </HStack>
            ) : (
              <Button leftIcon={<Plus size={16} />} size="sm" colorScheme="orange" onClick={onAddToCart}>
                Add
              </Button>
            )}

            <IconButton aria-label="Add to favorites" icon={<Heart size={16} />} variant="ghost" size="sm" />
          </Flex>
        </VStack>
      </HStack>
    </Box>
  )
}

export default MenuItemCard
