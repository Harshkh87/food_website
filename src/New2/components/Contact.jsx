"use client"

import {
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
  useToast,
  Icon,
} from "@chakra-ui/react"
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons"
import { MapPin, Clock } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
      title: "Message Sent!",
      description: "We will get back to you within 24 hours.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} textAlign="center" mb={12}>
        <Heading size="2xl">Get in Touch</Heading>
        <Text fontSize="lg" color="gray.600" maxW="2xl">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12}>
        {/* Contact Form */}
        <Card bg={cardBg}>
          <CardBody>
            <Heading size="lg" mb={6}>
              Send us a Message
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
                  <FormControl>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Subject</FormLabel>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={6}
                  />
                </FormControl>

                <Button type="submit" colorScheme="orange" size="lg" w="full">
                  Send Message
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>

        {/* Contact Information */}
        <VStack spacing={8} align="stretch">
          <Card bg={cardBg}>
            <CardBody>
              <Heading size="lg" mb={6}>
                Contact Information
              </Heading>
              <VStack spacing={6} align="start">
                <HStack>
                  <Icon as={PhoneIcon} color="orange.500" />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold">Phone</Text>
                    <Text color="gray.600">+91 98765 43210</Text>
                  </VStack>
                </HStack>

                <HStack>
                  <Icon as={EmailIcon} color="orange.500" />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold">Email</Text>
                    <Text color="gray.600">support@foodiehub.com</Text>
                  </VStack>
                </HStack>

                <HStack>
                  <Icon as={MapPin} color="orange.500" />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold">Address</Text>
                    <Text color="gray.600">
                      123 Food Street, Gourmet District
                      <br />
                      Mumbai, Maharashtra 400001
                    </Text>
                  </VStack>
                </HStack>

                <HStack>
                  <Icon as={Clock} color="orange.500" />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="semibold">Business Hours</Text>
                    <Text color="gray.600">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg}>
            <CardBody>
              <Heading size="md" mb={4}>
                Quick Support
              </Heading>
              <Text color="gray.600" mb={4}>
                For immediate assistance, you can also reach us through:
              </Text>
              <VStack spacing={3}>
                <Button colorScheme="green" w="full" leftIcon={<PhoneIcon />}>
                  WhatsApp Support
                </Button>
                <Button colorScheme="blue" w="full">
                  Live Chat
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </SimpleGrid>
    </Container>
  )
}
