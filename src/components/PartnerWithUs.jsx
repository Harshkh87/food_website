"use client"

import {
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"

export default function PartnerWithUs() {
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    restaurantType: "",
    cuisine: "",
    description: "",
  })

  const toast = useToast()
  const cardBg = useColorModeValue("white", "gray.800")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Application Submitted!",
      description: "We will contact you within 2-3 business days.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    setFormData({
      restaurantName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      restaurantType: "",
      cuisine: "",
      description: "",
    })
  }

  return (
    <Container maxW="4xl" py={8}>
      <VStack spacing={8} textAlign="center" mb={8}>
        <Heading size="2xl">Partner With Us</Heading>
        <Text fontSize="lg" color="gray.600">
          Join thousands of restaurants already growing with FoodieHub
        </Text>
      </VStack>

      <Card bg={cardBg}>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl isRequired>
                  <FormLabel>Restaurant Name</FormLabel>
                  <Input
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    placeholder="Enter restaurant name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Owner Name</FormLabel>
                  <Input
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter owner name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>City</FormLabel>
                  <Select name="city" value={formData.city} onChange={handleChange} placeholder="Select city">
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Restaurant Type</FormLabel>
                  <Select
                    name="restaurantType"
                    value={formData.restaurantType}
                    onChange={handleChange}
                    placeholder="Select type"
                  >
                    <option value="Veg">Vegetarian</option>
                    <option value="Non-Veg">Non-Vegetarian</option>
                    <option value="Both">Both</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Cuisine Type</FormLabel>
                <Input
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  placeholder="e.g., Indian, Chinese, Italian"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your restaurant..."
                  rows={4}
                />
              </FormControl>

              <Button type="submit" colorScheme="orange" size="lg" w="full">
                Submit Application
              </Button>
            </VStack>
          </form>
        </CardBody>
      </Card>
    </Container>
  )
}
