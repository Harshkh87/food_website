"use client"

import { useState } from "react"
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Input,
  Select,
  Card,
  CardBody,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"

const MenuFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
    preferences: [],
  })

  const cardBg = useColorModeValue("white", "gray.800")

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters }

    if (filterType === "preferences") {
      const currentPrefs = [...filters.preferences]
      if (currentPrefs.includes(value)) {
        newFilters.preferences = currentPrefs.filter((pref) => pref !== value)
      } else {
        newFilters.preferences = [...currentPrefs, value]
      }
    } else {
      newFilters[filterType] = value
    }

    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      category: "",
      type: "",
      preferences: [],
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const preferenceOptions = ["spicy", "gluten-free", "vegan"]

  return (
    <Card bg={cardBg} mb={6}>
      <CardBody>
        <HStack justify="space-between" mb={6}>
          <Heading size="md">Filter Menu</Heading>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </HStack>

        <VStack spacing={6} align="stretch">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search menu items..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </InputGroup>

          <HStack spacing={4}>
            <Select
              placeholder="All Categories"
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              flex={1}
            >
              <option value="appetizers">Appetizers</option>
              <option value="mains">Main Course</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
            </Select>

            <Select
              placeholder="All Types"
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              flex={1}
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </Select>
          </HStack>

          <Box>
            <Text fontSize="sm" fontWeight="500" mb={3}>
              Dietary Preferences:
            </Text>
            <Wrap spacing={2}>
              {preferenceOptions.map((pref) => (
                <WrapItem key={pref}>
                  <Button
                    size="sm"
                    variant={filters.preferences.includes(pref) ? "solid" : "outline"}
                    colorScheme={filters.preferences.includes(pref) ? "primary" : "gray"}
                    onClick={() => handleFilterChange("preferences", pref)}
                    textTransform="capitalize"
                  >
                    {pref}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default MenuFilters
