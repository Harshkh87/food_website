"use client"

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  useColorModeValue,
  VStack,
  HStack,
  IconButton,
  Divider,
} from "@chakra-ui/react"
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { Link as RouterLink } from "react-router-dom"

const SocialButton = ({ children, label, href }) => {
  return (
    <IconButton
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded="full"
      w={8}
      h={8}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      aria-label={label}
      icon={children}
    />
  )
}

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  )
}

export default function Footer() {
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const textColor = useColorModeValue("gray.700", "gray.200")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  return (
    <Box bg={bgColor} color={textColor}>
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr" }} spacing={8}>
          {/* Brand Section */}
          <Stack spacing={6}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="orange.500" mb={2}>
                FoodieHub
              </Text>
              <Text fontSize="sm" maxW="300px">
                Discover amazing food near you. Order from your favorite restaurants and get it delivered fast to your
                doorstep.
              </Text>
            </Box>
            <Stack direction="row" spacing={6}>
              <SocialButton label="Facebook" href="https://facebook.com">
                <FaFacebook />
              </SocialButton>
              <SocialButton label="Instagram" href="https://instagram.com">
                <FaInstagram />
              </SocialButton>
              <SocialButton label="Twitter" href="https://twitter.com">
                <FaTwitter />
              </SocialButton>
            </Stack>
          </Stack>

          {/* Navigation Links */}
          <Stack align="flex-start">
            <ListHeader>Quick Links</ListHeader>
            <Link as={RouterLink} to="/" _hover={{ color: "orange.500" }}>
              Home
            </Link>
            <Link as={RouterLink} to="/partner" _hover={{ color: "orange.500" }}>
              Partner With Us
            </Link>
            <Link as={RouterLink} to="/premium" _hover={{ color: "orange.500" }}>
              Premium Plans
            </Link>
            <Link as={RouterLink} to="/contact" _hover={{ color: "orange.500" }}>
              Contact
            </Link>
          </Stack>

          {/* Account Links */}
          <Stack align="flex-start">
            <ListHeader>Account</ListHeader>
            <Link as={RouterLink} to="/login" _hover={{ color: "orange.500" }}>
              Login
            </Link>
            <Link as={RouterLink} to="/signup" _hover={{ color: "orange.500" }}>
              Sign Up
            </Link>
            <Link href="#" _hover={{ color: "orange.500" }}>
              My Orders
            </Link>
            <Link href="#" _hover={{ color: "orange.500" }}>
              Help & Support
            </Link>
          </Stack>

          {/* Contact Info */}
          <Stack align="flex-start">
            <ListHeader>Contact Us</ListHeader>
            <VStack align="start" spacing={2}>
              <HStack>
                <FaEnvelope size={14} />
                <Text fontSize="sm">support@foodiehub.com</Text>
              </HStack>
              <HStack>
                <FaPhone size={14} />
                <Text fontSize="sm">+91 98765 43210</Text>
              </HStack>
              <HStack align="start">
                <FaMapMarkerAlt size={14} style={{ marginTop: "2px" }} />
                <Text fontSize="sm">
                  123 Food Street
                  <br />
                  Mumbai, Maharashtra 400001
                </Text>
              </HStack>
            </VStack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Divider borderColor={borderColor} />

      <Box py={6}>
        <Container maxW="6xl">
          <Stack direction={{ base: "column", md: "row" }} spacing={4} justify="space-between" align="center">
            <Text fontSize="sm">© 2024 FoodieHub. All rights reserved</Text>
            <Stack direction="row" spacing={6}>
              <Link href="#" fontSize="sm" _hover={{ color: "orange.500" }}>
                Privacy Policy
              </Link>
              <Link href="#" fontSize="sm" _hover={{ color: "orange.500" }}>
                Terms of Service
              </Link>
              <Link href="#" fontSize="sm" _hover={{ color: "orange.500" }}>
                Cookie Policy
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
