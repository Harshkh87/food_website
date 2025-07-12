"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  VStack,
  useColorModeValue,
  keyframes,
} from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)
const MotionCard = motion(Card)

// Keyframes for animations
const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -15px, 0);
  }
  70% {
    transform: translate3d(0, -7px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const FoodCategorySection = ({ onCategorySelect }) => {
  const [isVisible, setIsVisible] = useState(false)
  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  useEffect(() => {
    // Trigger animation on component mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const foodCategories = [
    {
      id: "pizza",
      name: "Pizza",
      icon: "🍕",
      description: "Cheesy, crispy, perfect!",
      color: "red.500",
      bgGradient: "linear(135deg, red.400, orange.500)",
    },
    {
      id: "burger",
      name: "Burger",
      icon: "🍔",
      description: "Juicy, loaded, satisfying!",
      color: "orange.500",
      bgGradient: "linear(135deg, orange.400, yellow.500)",
    },
    {
      id: "chinese",
      name: "Chinese",
      icon: "🍜",
      description: "Spicy, savory, authentic!",
      color: "yellow.600",
      bgGradient: "linear(135deg, yellow.400, red.500)",
    },
    {
      id: "indian",
      name: "Indian",
      icon: "🍛",
      description: "Rich, flavorful, aromatic!",
      color: "green.500",
      bgGradient: "linear(135deg, green.400, orange.500)",
    },
    {
      id: "desserts",
      name: "Desserts",
      icon: "🍨",
      description: "Sweet, creamy, delightful!",
      color: "pink.500",
      bgGradient: "linear(135deg, pink.400, purple.500)",
    },
    {
      id: "snacky",
      name: "Snacky",
      icon: "🍟",
      description: "Crispy, quick, tasty!",
      color: "yellow.500",
      bgGradient: "linear(135deg, yellow.400, orange.500)",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  }

  const iconVariants = {
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
        damping: 10,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  }

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category)
    }
  }

  return (
    <Box py={16} bg="gray.50" position="relative" overflow="hidden">
      {/* Background decorative elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        fontSize="6xl"
        opacity={0.1}
        animation={`${pulse} 4s ease-in-out infinite`}
        sx={{ animationDelay: '0s' }}
      >
        🍽️
      </Box>
      <Box
        position="absolute"
        top="20%"
        right="10%"
        fontSize="4xl"
        opacity={0.1}
        animation={`${bounce} 3s ease-in-out infinite`}
        sx={{ animationDelay: '1s' }}
      >
        ⭐
      </Box>
      <Box
        position="absolute"
        bottom="15%"
        left="15%"
        fontSize="5xl"
        opacity={0.1}
        animation={`${pulse} 5s ease-in-out infinite`}
        sx={{ animationDelay: '2s' }}
      >
        🎉
      </Box>

      <Container maxW="container.xl">
        <MotionBox
          textAlign="center"
          mb={12}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            mb={4}
          >
            <Text fontSize="4xl" mb={2}>
              🤔
            </Text>
          </MotionBox>

          <Heading size="xl" mb={4} bgGradient="linear(135deg, primary.500, accent.500)" bgClip="text" fontWeight="700">
            What's on your mind?
          </Heading>

          <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}>
            <Text fontSize="xl" color="gray.600" fontWeight="500" mb={2}>
              Craving something? Pick your flavor! 🍴
            </Text>
            <Text fontSize="md" color="gray.500">
              Discover amazing dishes from your favorite categories
            </Text>
          </MotionBox>
        </MotionBox>

        <MotionBox variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"}>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={{ base: 4, md: 6 }} maxW="1000px" mx="auto">
            {foodCategories.map((category, index) => (
              <MotionCard
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                whileTap={{ scale: 0.95 }}
                bg={cardBg}
                cursor="pointer"
                onClick={() => handleCategoryClick(category)}
                borderRadius="2xl"
                overflow="hidden"
                position="relative"
                border="2px"
                borderColor={borderColor}
                _hover={{
                  borderColor: category.color,
                  boxShadow: `0 10px 30px rgba(0, 0, 0, 0.1)`,
                }}
                transition="all 0.3s ease"
              >
                {/* Gradient background overlay */}
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgGradient={category.bgGradient}
                  opacity={0}
                  transition="opacity 0.3s ease"
                  _groupHover={{ opacity: 0.1 }}
                />

                <CardBody p={6} textAlign="center" position="relative" zIndex={1}>
                  <VStack spacing={3}>
                    <MotionBox
                      variants={iconVariants}
                      whileHover="hover"
                      fontSize={{ base: "3xl", md: "4xl" }}
                      lineHeight={1}
                    >
                      {category.icon}
                    </MotionBox>

                    <VStack spacing={1}>
                      <Heading size="sm" color="gray.800" fontWeight="600">
                        {category.name}
                      </Heading>
                      <Text fontSize="xs" color="gray.600" fontWeight="500" textAlign="center" lineHeight="short">
                        {category.description}
                      </Text>
                    </VStack>
                  </VStack>
                </CardBody>

                {/* Hover effect overlay */}
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  h="4px"
                  bg={category.color}
                  transform="scaleX(0)"
                  transformOrigin="left"
                  transition="transform 0.3s ease"
                  _groupHover={{ transform: "scaleX(1)" }}
                />
              </MotionCard>
            ))}
          </SimpleGrid>
        </MotionBox>

        {/* Call to action */}
        <MotionBox
          textAlign="center"
          mt={12}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Text fontSize="lg" color="gray.600" fontStyle="italic">
            Can't decide? Browse all restaurants and let your taste buds guide you! 👨‍🍳
          </Text>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default FoodCategorySection
