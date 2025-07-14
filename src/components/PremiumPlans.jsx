"use client"

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  List,
  ListItem,
  ListIcon,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons"

const plans = [
  {
    name: "Basic",
    price: "₹999",
    period: "/month",
    description: "Perfect for small restaurants",
    features: [
      "Online ordering system",
      "Basic analytics",
      "Customer support",
      "Mobile app listing",
      "Up to 50 orders/day",
    ],
    color: "gray",
    popular: false,
  },
  {
    name: "Standard",
    price: "₹1,999",
    period: "/month",
    description: "Great for growing businesses",
    features: [
      "Everything in Basic",
      "Advanced analytics",
      "Marketing tools",
      "Priority support",
      "Up to 200 orders/day",
      "Custom branding",
    ],
    color: "orange",
    popular: true,
  },
  {
    name: "Premium",
    price: "₹3,999",
    period: "/month",
    description: "For established restaurants",
    features: [
      "Everything in Standard",
      "Dedicated account manager",
      "Advanced marketing campaigns",
      "API access",
      "Unlimited orders",
      "White-label solution",
      "Custom integrations",
    ],
    color: "purple",
    popular: false,
  },
]

export default function PremiumPlans() {
  const cardBg = useColorModeValue("white", "gray.800")

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} textAlign="center" mb={12}>
        <Heading size="2xl">Choose Your Plan</Heading>
        <Text fontSize="lg" color="gray.600" maxW="2xl">
          Select the perfect plan for your restaurant and start growing your business with FoodieHub
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {plans.map((plan, index) => (
          <Card
            key={index}
            bg={cardBg}
            shadow="lg"
            position="relative"
            border={plan.popular ? "2px solid" : "1px solid"}
            borderColor={plan.popular ? "orange.500" : "gray.200"}
          >
            {plan.popular && (
              <Badge
                position="absolute"
                top="-10px"
                left="50%"
                transform="translateX(-50%)"
                colorScheme="orange"
                px={3}
                py={1}
                borderRadius="full"
              >
                Most Popular
              </Badge>
            )}

            <CardHeader textAlign="center" pb={4}>
              <Heading size="lg" mb={2}>
                {plan.name}
              </Heading>
              <Text color="gray.600" mb={4}>
                {plan.description}
              </Text>
              <HStack justify="center" align="baseline">
                <Text fontSize="4xl" fontWeight="bold" color={`${plan.color}.500`}>
                  {plan.price}
                </Text>
                <Text color="gray.600">{plan.period}</Text>
              </HStack>
            </CardHeader>

            <CardBody pt={0}>
              <List spacing={3} mb={8}>
                {plan.features.map((feature, featureIndex) => (
                  <ListItem key={featureIndex}>
                    <ListIcon as={CheckIcon} color="green.500" />
                    {feature}
                  </ListItem>
                ))}
              </List>

              <Button colorScheme={plan.color} size="lg" w="full" variant={plan.popular ? "solid" : "outline"}>
                Get Started
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      <Box textAlign="center" mt={12}>
        <Text color="gray.600" mb={4}>
          Need a custom solution? Contact our sales team.
        </Text>
        <Button variant="outline" colorScheme="orange">
          Contact Sales
        </Button>
      </Box>
    </Container>
  )
}
