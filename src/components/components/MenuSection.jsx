"use client"

import { useState } from "react"
import {
  HStack,
  Text,
  Heading,
  Collapse,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import MenuItem from "./MenuItem"

const MenuSection = ({ category, items, restaurantInfo }) => {
  const cardBg = useColorModeValue("white", "gray.800")
  const [isExpanded, setIsExpanded] = useState(true)

  if (!items || items.length === 0) return null

  return (
    <Card bg={cardBg} overflow="hidden">
      <CardHeader
        cursor="pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        _hover={{ bg: cardBg }}
        transition="background-color 0.2s"
      >
        <HStack justify="space-between">
          <HStack spacing={3}>
            <Heading size="md" textTransform="capitalize">
              {category}
            </Heading>
            <Text color="gray.500" fontSize="sm">
              ({items.length} items)
            </Text>
          </HStack>
          <IconButton
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
            icon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            variant="ghost"
            size="sm"
          />
        </HStack>
      </CardHeader>

      <Collapse in={isExpanded} animateOpacity>
        <CardBody pt={0}>
          <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={6}>
            {items.map((item) => (
              <MenuItem
                key={item.id}
                item={{ ...item, restaurantId: restaurantInfo.id, restaurantName: restaurantInfo.name }}
              />
            ))}
          </SimpleGrid>
        </CardBody>
      </Collapse>
    </Card>
  )
}

export default MenuSection
