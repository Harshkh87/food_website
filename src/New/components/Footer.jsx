import { Box, Grid, Heading, Text, Link, VStack, HStack } from "@chakra-ui/react"
import { Phone } from "lucide-react"

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={8}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
          <VStack align="start" spacing={4}>
            <Heading size="lg">FoodieHub</Heading>
            <Text color="gray.400">Your favorite food delivery platform</Text>
          </VStack>

          <VStack align="start" spacing={4}>
            <Heading size="md">Company</Heading>
            <VStack align="start" spacing={2} color="gray.400">
              <Link _hover={{ color: "white" }}>About Us</Link>
              <Link _hover={{ color: "white" }}>Careers</Link>
              <Link _hover={{ color: "white" }}>Contact</Link>
            </VStack>
          </VStack>

          <VStack align="start" spacing={4}>
            <Heading size="md">Support</Heading>
            <VStack align="start" spacing={2} color="gray.400">
              <Link _hover={{ color: "white" }}>Help Center</Link>
              <Link _hover={{ color: "white" }}>Terms of Service</Link>
              <Link _hover={{ color: "white" }}>Privacy Policy</Link>
            </VStack>
          </VStack>

          <VStack align="start" spacing={4}>
            <Heading size="md">Contact</Heading>
            <HStack spacing={2} color="gray.400">
              <Phone size={16} />
              <Text>+91 9876543210</Text>
            </HStack>
          </VStack>
        </Grid>
      </Box>
    </Box>
  )
}

export default Footer
