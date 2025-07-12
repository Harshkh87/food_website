"use client"

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Badge,
  Text,
} from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import { ShoppingCart } from "lucide-react"
import { Link as RouterLink } from "react-router-dom"

const Links = [
  { name: "Home", path: "/" },
  { name: "Partner with Us", path: "/partner" },
  { name: "Premium Plans", path: "/premium" },
  { name: "Contact", path: "/contact" },
]

const NavLink = ({ children, path }) => (
  <Link
    as={RouterLink}
    to={path}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Link>
)

export default function Navbar({ cartItems = [] }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <Box bg={useColorModeValue("white", "gray.900")} px={4} shadow="md">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={8} alignItems={"center"}>
          <Link as={RouterLink} to="/">
            <Text fontSize="xl" fontWeight="bold" color="orange.500">
              FoodieHub
            </Text>
          </Link>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} path={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems={"center"} gap={4}>
          <NavLink to="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button colorScheme="orange" size="sm">
              Sign Up
            </Button>
          </NavLink>

          <Box position="relative">
            <IconButton as={RouterLink} to="/cart" aria-label="Shopping cart" icon={<ShoppingCart />} variant="ghost" />
            {cartItemCount > 0 && (
              <Badge position="absolute" top="-1" right="-1" colorScheme="red" borderRadius="full" fontSize="xs">
                {cartItemCount}
              </Badge>
            )}
          </Box>

          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} path={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}
