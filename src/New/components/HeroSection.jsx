"use client"
import { Box, Heading, Text, Button, Input, InputGroup, InputLeftElement, HStack } from "@chakra-ui/react"
import { Search } from "lucide-react"

const HeroSection = ({ searchQuery, setSearchQuery, vegFilter, onVegToggle }) => {
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

  return (
    <Box bgGradient="linear(to-r, orange.500, red.500)" color="white" py={12}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }} textAlign="center">
        <Heading size="2xl" mb={4}>
          Discover Great Food
        </Heading>
        <Text fontSize="xl" mb={8}>
          Order from your favorite restaurants
        </Text>

        <Box maxW="2xl" mx="auto">
          <HStack spacing={2}>
            <InputGroup flex={1}>
              <InputLeftElement>
                <Search size={20} color="gray" />
              </InputLeftElement>
              <Input
                placeholder="Search restaurants, dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                h="12"
                bg="white"
                color="gray.900"
              />
            </InputGroup>
            <Button
              onClick={onVegToggle}
              variant={vegFilter === "all" ? "outline" : "solid"}
              h="12"
              px={6}
              whiteSpace="nowrap"
              bg={vegFilter === "all" ? "whiteAlpha.200" : "white"}
              color={vegFilter === "all" ? "white" : "gray.900"}
              _hover={{
                bg: vegFilter === "all" ? "whiteAlpha.300" : "gray.100",
              }}
            >
              {getVegButtonText()}
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

export default HeroSection
