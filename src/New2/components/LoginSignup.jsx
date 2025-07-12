"use client"

import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react"
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa"
import { useState } from "react"
import { Link as RouterLink } from "react-router-dom"

export default function LoginSignup({ mode = "login" }) {
  const [isLogin, setIsLogin] = useState(mode === "login")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const cardBg = useColorModeValue("white", "gray.800")

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    // Mock Google login
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Success!",
        description: "Successfully signed in with Google",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      // Redirect to home page
      window.location.href = "/"
    }, 1500)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock form submission
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: isLogin ? "Login Successful!" : "Account Created!",
        description: isLogin ? "Welcome back to FoodieHub" : "Your account has been created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
      // Redirect to home page
      window.location.href = "/"
    }, 1500)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    })
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <Container maxW="lg" py={{ base: "12", md: "24" }} px={{ base: "0", sm: "8" }}>
        <Stack spacing="8">
          <Stack spacing="6">
            {/* Header */}
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
                <Heading size="lg" color="orange.500">
                  FoodieHub
                </Heading>
              </Link>
              <Heading size={{ base: "xs", md: "sm" }}>
                {isLogin ? "Sign in to your account" : "Create your account"}
              </Heading>
              <Text color="muted">
                {isLogin
                  ? "Welcome back! Please sign in to continue"
                  : "Join FoodieHub and discover amazing restaurants"}
              </Text>
            </Stack>
          </Stack>

          <Box py={{ base: "0", sm: "8" }} px={{ base: "4", sm: "10" }} bg={cardBg} boxShadow="md" borderRadius="xl">
            <Stack spacing="6">
              {/* Social Login Buttons */}
              <Stack spacing="3">
                <Button
                  variant="outline"
                  leftIcon={<FaGoogle />}
                  onClick={handleGoogleLogin}
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  size="lg"
                  _hover={{ bg: "red.50", borderColor: "red.300" }}
                >
                  Continue with Google
                </Button>

                <HStack spacing="3">
                  <Button
                    variant="outline"
                    leftIcon={<FaFacebook />}
                    flex={1}
                    _hover={{ bg: "blue.50", borderColor: "blue.300" }}
                  >
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<FaApple />}
                    flex={1}
                    _hover={{ bg: "gray.50", borderColor: "gray.400" }}
                  >
                    Apple
                  </Button>
                </HStack>
              </Stack>

              <HStack>
                <Divider />
                <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                  or continue with email
                </Text>
                <Divider />
              </HStack>

              {/* Form */}
              <form onSubmit={handleFormSubmit}>
                <Stack spacing="5">
                  {!isLogin && (
                    <FormControl isRequired>
                      <FormLabel htmlFor="name">Full Name</FormLabel>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </FormControl>
                  )}

                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                  </FormControl>

                  {!isLogin && (
                    <FormControl isRequired>
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                      />
                    </FormControl>
                  )}

                  <Stack spacing="6">
                    {isLogin && (
                      <HStack justify="space-between">
                        <Text fontSize="sm">
                          <Link color="orange.500" _hover={{ textDecoration: "underline" }}>
                            Forgot password?
                          </Link>
                        </Text>
                      </HStack>
                    )}

                    <Button
                      type="submit"
                      colorScheme="orange"
                      size="lg"
                      fontSize="md"
                      isLoading={isLoading}
                      loadingText={isLogin ? "Signing in..." : "Creating account..."}
                    >
                      {isLogin ? "Sign in" : "Create account"}
                    </Button>
                  </Stack>
                </Stack>
              </form>

              <HStack spacing="1" justify="center">
                <Text fontSize="sm">{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
                <Button variant="link" colorScheme="orange" onClick={toggleMode}>
                  {isLogin ? "Sign up" : "Sign in"}
                </Button>
              </HStack>

              {/* Terms */}
              <Text fontSize="xs" textAlign="center" color="muted">
                By continuing, you agree to our{" "}
                <Link color="orange.500" _hover={{ textDecoration: "underline" }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link color="orange.500" _hover={{ textDecoration: "underline" }}>
                  Privacy Policy
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
