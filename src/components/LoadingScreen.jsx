"use client"

import { Box, Center, Text, Image, VStack, Spinner, useColorModeValue, keyframes } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const MotionBox = motion(Box)
const MotionText = motion(Text)

// Keyframes for pulse animation
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

// Keyframes for fade in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

export default function LoadingScreen({
  type = "initial", // "initial" or "restaurant"
  restaurant = null,
  isVisible = true,
  onComplete = () => {},
}) {
  const [showContent, setShowContent] = useState(false)
  const bgColor = useColorModeValue("white", "gray.900")
  const textColor = useColorModeValue("gray.800", "white")
  const accentColor = useColorModeValue("orange.500", "orange.400")

  useEffect(() => {
    if (isVisible) {
      setShowContent(true)

      // Auto-hide after 2 seconds for initial load, 1.5 seconds for restaurant load
      const timeout = setTimeout(
        () => {
          onComplete()
        },
        type === "initial" ? 2000 : 1500,
      )

      return () => clearTimeout(timeout)
    }
  }, [isVisible, type, onComplete])

  if (!isVisible) return null

  const renderInitialSplash = () => (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <VStack spacing={8}>
        {/* Brand Logo/Icon */}
        <MotionBox
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Box
            w="80px"
            h="80px"
            bg={accentColor}
            borderRadius="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animation={`${pulse} 2s infinite`}
            boxShadow="0 10px 30px rgba(0,0,0,0.1)"
          >
            <Text fontSize="3xl" color="white">
              🍽️
            </Text>
          </Box>
        </MotionBox>

        {/* Brand Name */}
        <MotionText
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color={accentColor}
          textAlign="center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          FoodieHub
        </MotionText>

        {/* Tagline */}
        <MotionText
          fontSize="lg"
          color={textColor}
          textAlign="center"
          opacity={0.8}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.8 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Discover Amazing Food Near You
        </MotionText>

        {/* Loading Spinner */}
        <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }}>
          <Spinner thickness="3px" speed="0.8s" emptyColor="gray.200" color={accentColor} size="lg" />
        </MotionBox>
      </VStack>
    </MotionBox>
  )

  const renderRestaurantSplash = () => (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <VStack spacing={6}>
        {/* Restaurant Image or Fallback */}
        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {restaurant?.image ? (
            <Image
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              boxSize="100px"
              objectFit="cover"
              borderRadius="20px"
              boxShadow="0 8px 25px rgba(0,0,0,0.15)"
              fallback={
                <Box
                  w="100px"
                  h="100px"
                  bg={accentColor}
                  borderRadius="20px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 8px 25px rgba(0,0,0,0.15)"
                >
                  <Text fontSize="3xl" color="white">
                    🍽️
                  </Text>
                </Box>
              }
            />
          ) : (
            <Box
              w="100px"
              h="100px"
              bg={accentColor}
              borderRadius="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 8px 25px rgba(0,0,0,0.15)"
              animation={`${pulse} 2s infinite`}
            >
              <Text fontSize="3xl" color="white">
                🍽️
              </Text>
            </Box>
          )}
        </MotionBox>

        {/* Restaurant Name or FoodieHub */}
        <MotionText
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color={textColor}
          textAlign="center"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {restaurant?.name || "FoodieHub"}
        </MotionText>

        {/* Loading indicator */}
        <MotionText
          fontSize="md"
          color={textColor}
          opacity={0.7}
          textAlign="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Loading restaurant details...
        </MotionText>

        {/* Loading Spinner */}
        <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.3 }}>
          <Spinner thickness="2px" speed="0.8s" emptyColor="gray.200" color={accentColor} size="md" />
        </MotionBox>
      </VStack>
    </MotionBox>
  )

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg={bgColor}
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Center w="full" h="full" p={8}>
        {type === "initial" ? renderInitialSplash() : renderRestaurantSplash()}
      </Center>
    </Box>
  )
}
