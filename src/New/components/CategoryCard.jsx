import { Box, Text, VStack } from "@chakra-ui/react"

const CategoryCard = ({ category }) => {
  return (
    <Box
      bg="white"
      p={4}
      borderRadius="lg"
      shadow="sm"
      cursor="pointer"
      transition="all 0.2s"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
    >
      <VStack spacing={2}>
        <Text fontSize="3xl">{category.icon}</Text>
        <Text fontWeight="semibold">{category.name}</Text>
        <Text fontSize="sm" color="gray.600">
          {category.count} restaurants
        </Text>
      </VStack>
    </Box>
  )
}

export default CategoryCard
