"use client"

import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  useColorModeValue,
  IconButton,
  Tooltip,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Box as ThreeBox, Plane } from "@react-three/drei"
import { useState, useRef } from "react"
import { RotateCcw } from "lucide-react"

// Mock table data based on restaurant layout
const restaurantTables = {
  "2-seater": [
    { id: "T2-01", name: "Table 2A", position: [-4, 0, -3], available: true, location: "Window Side" },
    { id: "T2-02", name: "Table 2B", position: [-4, 0, 0], available: true, location: "Window Side" },
    { id: "T2-03", name: "Table 2C", position: [-4, 0, 3], available: false, location: "Window Side" },
    { id: "T2-04", name: "Table 2D", position: [0, 0, -4], available: true, location: "Center" },
    { id: "T2-05", name: "Table 2E", position: [0, 0, 4], available: true, location: "Center" },
    { id: "T2-06", name: "Table 2F", position: [4, 0, -3], available: true, location: "Garden View" },
    { id: "T2-07", name: "Table 2G", position: [4, 0, 0], available: false, location: "Garden View" },
    { id: "T2-08", name: "Table 2H", position: [4, 0, 3], available: true, location: "Garden View" },
  ],
  "4-seater": [
    { id: "T4-01", name: "Table 4A", position: [-3, 0, -2], available: true, location: "Window Side" },
    { id: "T4-02", name: "Table 4B", position: [-3, 0, 2], available: true, location: "Window Side" },
    { id: "T4-03", name: "Table 4C", position: [0, 0, -3], available: false, location: "Center" },
    { id: "T4-04", name: "Table 4D", position: [0, 0, 0], available: true, location: "Center" },
    { id: "T4-05", name: "Table 4E", position: [0, 0, 3], available: true, location: "Center" },
    { id: "T4-06", name: "Table 4F", position: [3, 0, -2], available: true, location: "Garden View" },
    { id: "T4-07", name: "Table 4G", position: [3, 0, 2], available: false, location: "Garden View" },
  ],
  "6-seater": [
    { id: "T6-01", name: "Table 6A", position: [-2, 0, -2], available: true, location: "Window Side" },
    { id: "T6-02", name: "Table 6B", position: [-2, 0, 2], available: true, location: "Window Side" },
    { id: "T6-03", name: "Table 6C", position: [2, 0, -2], available: false, location: "Garden View" },
    { id: "T6-04", name: "Table 6D", position: [2, 0, 2], available: true, location: "Garden View" },
    { id: "T6-05", name: "Table 6E", position: [0, 0, 0], available: true, location: "Center Premium" },
  ],
  "8-seater": [
    { id: "T8-01", name: "Table 8A", position: [-1.5, 0, -1.5], available: true, location: "Private Corner" },
    { id: "T8-02", name: "Table 8B", position: [1.5, 0, -1.5], available: false, location: "Private Corner" },
    { id: "T8-03", name: "Table 8C", position: [-1.5, 0, 1.5], available: true, location: "Family Section" },
    { id: "T8-04", name: "Table 8D", position: [1.5, 0, 1.5], available: true, location: "Family Section" },
  ],
}

function Table({ table, isSelected, onClick, size }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  const getTableColor = () => {
    if (!table.available) return "#ff6b6b" // Red for unavailable
    if (isSelected) return "#fd7f28" // Orange for selected
    if (hovered) return "#4ecdc4" // Teal for hovered
    return "#51cf66" // Green for available
  }

  const getTableSize = () => {
    switch (size) {
      case "2-seater":
        return [0.8, 0.1, 0.8]
      case "4-seater":
        return [1.2, 0.1, 1.2]
      case "6-seater":
        return [1.6, 0.1, 1.6]
      case "8-seater":
        return [2.0, 0.1, 2.0]
      default:
        return [1.0, 0.1, 1.0]
    }
  }

  return (
    <group position={table.position}>
      <ThreeBox
        ref={meshRef}
        args={getTableSize()}
        onClick={table.available ? onClick : undefined}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={getTableColor()} />
      </ThreeBox>

      {/* Table Label */}
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={0.15}
        height={0.02}
        position={[0, 0.2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {table.name}
        <meshStandardMaterial color="#2d3748" />
      </Text3D>

      {/* Chairs representation */}
      {Array.from({ length: Number.parseInt(size.split("-")[0]) }).map((_, i) => {
        const angle = (i / Number.parseInt(size.split("-")[0])) * Math.PI * 2
        const radius = getTableSize()[0] / 2 + 0.3
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <ThreeBox key={i} args={[0.2, 0.4, 0.2]} position={[x, 0.2, z]}>
            <meshStandardMaterial color="#8b4513" />
          </ThreeBox>
        )
      })}
    </group>
  )
}

function RestaurantFloor() {
  return (
    <>
      {/* Main Floor */}
      <Plane args={[12, 12]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#f7fafc" />
      </Plane>

      {/* Walls */}
      <Plane args={[12, 4]} position={[0, 2, -6]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Plane>
      <Plane args={[12, 4]} position={[0, 2, 6]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Plane>
      <Plane args={[12, 4]} position={[-6, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Plane>
      <Plane args={[12, 4]} position={[6, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Plane>

      {/* Windows (left wall) */}
      {[-3, 0, 3].map((z, i) => (
        <Plane key={i} args={[1.5, 2]} position={[-5.9, 1.5, z]} rotation={[0, Math.PI / 2, 0]}>
          <meshStandardMaterial color="#87ceeb" opacity={0.7} transparent />
        </Plane>
      ))}

      {/* Garden View (right wall) */}
      {[-2, 2].map((z, i) => (
        <Plane key={i} args={[2, 2.5]} position={[5.9, 1.5, z]} rotation={[0, -Math.PI / 2, 0]}>
          <meshStandardMaterial color="#90ee90" opacity={0.6} transparent />
        </Plane>
      ))}

      {/* Kitchen Door */}
      <Plane args={[1, 2]} position={[0, 1, 5.9]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial color="#8b4513" />
      </Plane>
    </>
  )
}

export default function RestaurantLayout3D({ selectedSize, onTableSelect, selectedTable }) {
  const [cameraPosition, setCameraPosition] = useState([8, 8, 8])
  const controlsRef = useRef()
  const bgColor = useColorModeValue("#f7fafc", "#1a202c")

  const availableTables = restaurantTables[selectedSize?.id] || []
  const availableCount = availableTables.filter((table) => table.available).length
  const totalCount = availableTables.length

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <VStack spacing={4} w="full">
      {/* Controls and Info */}
      <HStack justify="space-between" w="full" wrap="wrap" spacing={4}>
        <VStack align="start" spacing={1}>
          <Heading size="sm">Restaurant Layout</Heading>
          <Text fontSize="sm" color="gray.600">
            Click on available tables to select • Drag to rotate • Scroll to zoom
          </Text>
        </VStack>

        <HStack spacing={2}>
          <Tooltip label="Reset View">
            <IconButton aria-label="Reset view" icon={<RotateCcw size={16} />} size="sm" onClick={resetView} />
          </Tooltip>
          <Badge colorScheme="green">{availableCount} Available</Badge>
          <Badge colorScheme="red">{totalCount - availableCount} Occupied</Badge>
        </HStack>
      </HStack>

      {/* 3D Scene */}
      <Box w="full" h="500px" borderRadius="lg" overflow="hidden" border="1px solid" borderColor="gray.200">
        <Canvas camera={{ position: cameraPosition, fov: 60 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, 10, -10]} intensity={0.5} />

          <RestaurantFloor />

          {availableTables.map((table) => (
            <Table
              key={table.id}
              table={table}
              size={selectedSize?.id}
              isSelected={selectedTable?.id === table.id}
              onClick={() => onTableSelect(table)}
            />
          ))}

          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </Box>

      {/* Legend */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
        <Card size="sm">
          <CardBody textAlign="center" py={3}>
            <Box w={4} h={4} bg="green.400" borderRadius="sm" mx="auto" mb={2} />
            <Text fontSize="xs">Available</Text>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody textAlign="center" py={3}>
            <Box w={4} h={4} bg="red.400" borderRadius="sm" mx="auto" mb={2} />
            <Text fontSize="xs">Occupied</Text>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody textAlign="center" py={3}>
            <Box w={4} h={4} bg="orange.400" borderRadius="sm" mx="auto" mb={2} />
            <Text fontSize="xs">Selected</Text>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody textAlign="center" py={3}>
            <Box w={4} h={4} bg="teal.400" borderRadius="sm" mx="auto" mb={2} />
            <Text fontSize="xs">Hover</Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Selected Table Info */}
      {selectedTable && (
        <Card bg="orange.50" borderColor="orange.200" borderWidth={1} w="full">
          <CardBody>
            <VStack spacing={2}>
              <Heading size="sm" color="orange.700">
                Selected: {selectedTable.name}
              </Heading>
              <HStack spacing={4}>
                <Badge colorScheme="blue">{selectedTable.location}</Badge>
                <Badge colorScheme="green">Available</Badge>
              </HStack>
              <Text fontSize="sm" color="orange.600" textAlign="center">
                Perfect {selectedSize?.name.toLowerCase()} with {selectedTable.location.toLowerCase()} location
              </Text>
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  )
}
