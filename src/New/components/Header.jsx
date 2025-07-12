import { Box, Flex, Heading, Button, Text, HStack } from "@chakra-ui/react"
import { MapPin } from "lucide-react"

const Header = () => {
  return (
    <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
        <Flex align="center" justify="space-between" h="16">
          <HStack spacing={4}>
            <Heading size="lg" color="orange.600">
              FoodieHub
            </Heading>
            <HStack spacing={2} display={{ base: "none", md: "flex" }}>
              <MapPin size={16} />
              <Text fontSize="sm" color="gray.600">
                Delhi, India
              </Text>
            </HStack>
          </HStack>

          <HStack spacing={4}>
            <Button variant="ghost">Login</Button>
            <Button colorScheme="orange">Sign Up</Button>
          </HStack>
        </Flex>
      </Box>
    </Box>
  )
}

export default Header
