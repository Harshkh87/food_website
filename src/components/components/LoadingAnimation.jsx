"use client"

import { Box, Heading, Text, VStack, useColorModeValue } from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)
const MotionText = motion(Text)

const LoadingAnimation = ({ isVisible = true, onComplete }) => {
  const bgColor = useColorModeValue("white", "gray.900")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  }

  const logoVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 1,
      },
    },
  }

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const foodIconVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  if (!isVisible) return null

  return (
    <MotionBox
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onAnimationComplete={() => {
        if (onComplete) {
          setTimeout(onComplete, 2000) // Show for 2 seconds then fade out
        }
      }}
    >
      <VStack spacing={8}>
        {/* Floating food icons */}
        <Box position="relative">
          <MotionBox
            variants={foodIconVariants}
            animate={floatingAnimation}
            position="absolute"
            top="-60px"
            left="-80px"
            fontSize="3xl"
          >
            🍕
          </MotionBox>
          <MotionBox
            variants={foodIconVariants}
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 0.5 },
            }}
            position="absolute"
            top="-40px"
            right="-70px"
            fontSize="2xl"
          >
            🍔
          </MotionBox>
          <MotionBox
            variants={foodIconVariants}
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1 },
            }}
            position="absolute"
            bottom="-50px"
            left="-60px"
            fontSize="2xl"
          >
            🍜
          </MotionBox>
          <MotionBox
            variants={foodIconVariants}
            animate={{
              ...floatingAnimation,
              transition: { ...floatingAnimation.transition, delay: 1.5 },
            }}
            position="absolute"
            bottom="-40px"
            right="-80px"
            fontSize="3xl"
          >
            🍨
          </MotionBox>

          {/* Main logo */}
          <MotionBox variants={logoVariants} fontSize="6xl" textAlign="center">
            🍽️
          </MotionBox>
        </Box>

        {/* Brand name */}
        <VStack spacing={2}>
          <MotionBox variants={textVariants}>
            <Heading
              size="2xl"
              bgGradient="linear(135deg, primary.500, accent.500)"
              bgClip="text"
              fontWeight="700"
              textAlign="center"
            >
              FoodieHub
            </Heading>
          </MotionBox>

          <MotionText variants={textVariants} fontSize="lg" color="gray.600" textAlign="center" fontWeight="500">
            Delicious food, delivered fresh! 🚀
          </MotionText>
        </VStack>

        {/* Loading dots */}
        <MotionBox variants={textVariants} display="flex" gap={2}>
          {[0, 1, 2].map((index) => (
            <MotionBox
              key={index}
              w="12px"
              h="12px"
              bg="primary.500"
              borderRadius="full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </MotionBox>
      </VStack>
    </MotionBox>
  )
}

export default LoadingAnimation
