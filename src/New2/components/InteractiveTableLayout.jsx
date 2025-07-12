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
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useState, useRef, useEffect } from "react"
import { ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react"

// Mock table data based on restaurant areas and capacity
const mockTableData = [
  // Rooftop Area
  { _id: "1", resId: "rest1", tableName: "R1", capacity: 2, status: "available", area: "Rooftop" },
  { _id: "2", resId: "rest1", tableName: "R2", capacity: 2, status: "occupied", area: "Rooftop" },
  { _id: "3", resId: "rest1", tableName: "R3", capacity: 4, status: "available", area: "Rooftop" },
  { _id: "4", resId: "rest1", tableName: "R4", capacity: 4, status: "reserved", area: "Rooftop" },
  { _id: "5", resId: "rest1", tableName: "R5", capacity: 6, status: "available", area: "Rooftop" },
  { _id: "6", resId: "rest1", tableName: "R6", capacity: 8, status: "available", area: "Rooftop" },

  // Lounge Area
  { _id: "7", resId: "rest1", tableName: "L1", capacity: 2, status: "available", area: "Lounge" },
  { _id: "8", resId: "rest1", tableName: "L2", capacity: 2, status: "available", area: "Lounge" },
  { _id: "9", resId: "rest1", tableName: "L3", capacity: 4, status: "occupied", area: "Lounge" },
  { _id: "10", resId: "rest1", tableName: "L4", capacity: 4, status: "available", area: "Lounge" },
  { _id: "11", resId: "rest1", tableName: "L5", capacity: 6, status: "reserved", area: "Lounge" },
  { _id: "12", resId: "rest1", tableName: "L6", capacity: 6, status: "available", area: "Lounge" },
  { _id: "13", resId: "rest1", tableName: "L7", capacity: 8, status: "available", area: "Lounge" },

  // Indoor Area
  { _id: "14", resId: "rest1", tableName: "I1", capacity: 2, status: "available", area: "Indoor" },
  { _id: "15", resId: "rest1", tableName: "I2", capacity: 2, status: "occupied", area: "Indoor" },
  { _id: "16", resId: "rest1", tableName: "I3", capacity: 2, status: "available", area: "Indoor" },
  { _id: "17", resId: "rest1", tableName: "I4", capacity: 4, status: "available", area: "Indoor" },
  { _id: "18", resId: "rest1", tableName: "I5", capacity: 4, status: "available", area: "Indoor" },
  { _id: "19", resId: "rest1", tableName: "I6", capacity: 4, status: "reserved", area: "Indoor" },
  { _id: "20", resId: "rest1", tableName: "I7", capacity: 6, status: "available", area: "Indoor" },
  { _id: "21", resId: "rest1", tableName: "I8", capacity: 6, status: "available", area: "Indoor" },
  { _id: "22", resId: "rest1", tableName: "I9", capacity: 8, status: "occupied", area: "Indoor" },
  { _id: "23", resId: "rest1", tableName: "I10", capacity: 8, status: "available", area: "Indoor" },

  // Garden Area
  { _id: "24", resId: "rest1", tableName: "G1", capacity: 2, status: "available", area: "Garden" },
  { _id: "25", resId: "rest1", tableName: "G2", capacity: 4, status: "available", area: "Garden" },
  { _id: "26", resId: "rest1", tableName: "G3", capacity: 6, status: "reserved", area: "Garden" },
  { _id: "27", resId: "rest1", tableName: "G4", capacity: 8, status: "available", area: "Garden" },
]

function TableCard({ table, isSelected, onSelect, selectedCapacity }) {
  const cardBg = useColorModeValue("white", "gray.700")
  const borderColor = useColorModeValue("gray.200", "gray.600")

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "green"
      case "occupied":
        return "red"
      case "reserved":
        return "yellow"
      default:
        return "gray"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Available"
      case "occupied":
        return "Occupied"
      case "reserved":
        return "Reserved"
      default:
        return "Unknown"
    }
  }

  const isClickable = table.status === "available" && table.capacity === selectedCapacity
  const isDisabled = table.status !== "available" || table.capacity !== selectedCapacity

  return (
    <Tooltip
      label={
        isDisabled
          ? table.status !== "available"
            ? `Table ${table.tableName} is ${table.status}`
            : `Table ${table.tableName} seats ${table.capacity} people (you selected ${selectedCapacity}-seater)`
          : `Click to select ${table.tableName}`
      }
      placement="top"
    >
      <Card
        bg={cardBg}
        border="2px solid"
        borderColor={isSelected ? "orange.500" : isDisabled ? "gray.300" : borderColor}
        cursor={isClickable ? "pointer" : "not-allowed"}
        opacity={isDisabled ? 0.6 : 1}
        _hover={
          isClickable
            ? {
                shadow: "md",
                transform: "translateY(-2px)",
                borderColor: "orange.300",
              }
            : {}
        }
        onClick={isClickable ? () => onSelect(table) : undefined}
        transition="all 0.2s"
        size="sm"
        minH="100px"
        position="relative"
      >
        <CardBody p={3} textAlign="center">
          <VStack spacing={2}>
            <Heading size="sm" color={isSelected ? "orange.500" : "inherit"}>
              {table.tableName}
            </Heading>

            <Badge
              colorScheme={getStatusColor(table.status)}
              variant={table.status === "available" ? "solid" : "outline"}
              fontSize="xs"
            >
              {getStatusText(table.status)}
            </Badge>

            <HStack spacing={1} fontSize="xs" color="gray.600">
              <Text>👥</Text>
              <Text>{table.capacity}</Text>
            </HStack>
          </VStack>

          {isSelected && (
            <Box
              position="absolute"
              top="2px"
              right="2px"
              w="12px"
              h="12px"
              bg="orange.500"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="white" fontSize="8px" fontWeight="bold">
                ✓
              </Text>
            </Box>
          )}
        </CardBody>
      </Card>
    </Tooltip>
  )
}

function AreaSection({ area, tables, selectedTable, onTableSelect, selectedCapacity }) {
  const areaBg = useColorModeValue("gray.50", "gray.800")
  const availableTables = tables.filter((t) => t.status === "available" && t.capacity === selectedCapacity)
  const totalTables = tables.filter((t) => t.capacity === selectedCapacity)

  const gridColumns = useBreakpointValue({ base: 2, sm: 3, md: 4, lg: 5 })

  return (
    <Box bg={areaBg} p={4} borderRadius="lg" border="1px solid" borderColor="gray.200">
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between" align="center">
          <Heading size="md" color="gray.700">
            {area}
          </Heading>
          <HStack spacing={2}>
            <Badge colorScheme="green" variant="outline">
              {availableTables.length} Available
            </Badge>
            <Badge colorScheme="gray" variant="outline">
              {totalTables.length} Total
            </Badge>
          </HStack>
        </HStack>

        {totalTables.length > 0 ? (
          <SimpleGrid columns={gridColumns} spacing={3}>
            {tables.map((table) => (
              <TableCard
                key={table._id}
                table={table}
                isSelected={selectedTable?._id === table._id}
                onSelect={onTableSelect}
                selectedCapacity={selectedCapacity}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.500" textAlign="center" py={4}>
            No {selectedCapacity}-seater tables available in this area
          </Text>
        )}
      </VStack>
    </Box>
  )
}

export default function InteractiveTableLayout({ selectedSize, onTableSelect, selectedTable }) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const selectedCapacity = selectedSize ? selectedSize.capacity : 2

  // Group tables by area
  const tablesByArea = mockTableData.reduce((acc, table) => {
    if (!acc[table.area]) {
      acc[table.area] = []
    }
    acc[table.area].push(table)
    return acc
  }, {})

  const areas = Object.keys(tablesByArea)

  // Zoom controls
  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Pan controls
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch events for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setDragStart({
      x: touch.clientX - pan.x,
      y: touch.clientY - pan.y,
    })
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    e.preventDefault()

    const touch = e.touches[0]
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((prev) => Math.max(0.5, Math.min(2, prev + delta)))
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
      return () => container.removeEventListener("wheel", handleWheel)
    }
  }, [])

  const totalAvailable = mockTableData.filter((t) => t.status === "available" && t.capacity === selectedCapacity).length

  const totalTables = mockTableData.filter((t) => t.capacity === selectedCapacity).length

  return (
    <VStack spacing={4} w="full">
      {/* Controls and Info */}
      <Flex justify="space-between" align="center" w="full" wrap="wrap" gap={4}>
        <VStack align="start" spacing={1}>
          <Heading size="sm">Restaurant Floor Plan</Heading>
          <Text fontSize="sm" color="gray.600">
            Drag to pan • Scroll to zoom • Click available tables to select
          </Text>
        </VStack>

        <HStack spacing={2}>
          <Tooltip label="Zoom In">
            <IconButton
              aria-label="Zoom in"
              icon={<ZoomIn size={16} />}
              size="sm"
              onClick={handleZoomIn}
              isDisabled={zoom >= 2}
            />
          </Tooltip>
          <Tooltip label="Zoom Out">
            <IconButton
              aria-label="Zoom out"
              icon={<ZoomOut size={16} />}
              size="sm"
              onClick={handleZoomOut}
              isDisabled={zoom <= 0.5}
            />
          </Tooltip>
          <Tooltip label="Reset View">
            <IconButton aria-label="Reset view" icon={<RotateCcw size={16} />} size="sm" onClick={handleReset} />
          </Tooltip>
          <Badge colorScheme="blue">Zoom: {Math.round(zoom * 100)}%</Badge>
        </HStack>
      </Flex>

      {/* Stats */}
      <HStack spacing={4} w="full" justify="center">
        <Badge colorScheme="green" px={3} py={1}>
          {totalAvailable} Available {selectedCapacity}-seaters
        </Badge>
        <Badge colorScheme="gray" px={3} py={1}>
          {totalTables} Total {selectedCapacity}-seaters
        </Badge>
      </HStack>

      {/* Interactive Layout Container */}
      <Box
        ref={containerRef}
        w="full"
        h="600px"
        border="2px solid"
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
        cursor={isDragging ? "grabbing" : "grab"}
        bg="gray.50"
      >
        <Box
          w="full"
          h="full"
          transform={`translate(${pan.x}px, ${pan.y}px) scale(${zoom})`}
          transformOrigin="center center"
          transition={isDragging ? "none" : "transform 0.2s ease"}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          p={6}
          minH="full"
        >
          <VStack spacing={6} align="stretch">
            {areas.map((area) => (
              <AreaSection
                key={area}
                area={area}
                tables={tablesByArea[area]}
                selectedTable={selectedTable}
                onTableSelect={onTableSelect}
                selectedCapacity={selectedCapacity}
              />
            ))}
          </VStack>
        </Box>

        {/* Pan Hint */}
        <Box
          position="absolute"
          bottom={4}
          right={4}
          bg="blackAlpha.700"
          color="white"
          px={3}
          py={1}
          borderRadius="md"
          fontSize="xs"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Move size={12} />
          <Text>Drag to pan</Text>
        </Box>
      </Box>

      {/* Legend */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} w="full">
        <Card size="sm">
          <CardBody textAlign="center" py={3}>
            <Badge colorScheme="green" mb={2}>
              Available
            </Badge>
            <Text fontSize="xs" color="gray.600">
              Ready to book
            </Text>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody textAlign="center" py={3}>
            <Badge colorScheme="red" mb={2}>
              Occupied
            </Badge>
            <Text fontSize="xs" color="gray.600">
              Currently dining
            </Text>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody textAlign="center" py={3}>
            <Badge colorScheme="yellow" mb={2}>
              Reserved
            </Badge>
            <Text fontSize="xs" color="gray.600">
              Already booked
            </Text>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody textAlign="center" py={3}>
            <Badge colorScheme="orange" mb={2}>
              Selected
            </Badge>
            <Text fontSize="xs" color="gray.600">
              Your choice
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Selected Table Info */}
      {selectedTable && (
        <Card bg="orange.50" borderColor="orange.200" borderWidth={1} w="full">
          <CardBody>
            <VStack spacing={2}>
              <Heading size="sm" color="orange.700">
                Selected: Table {selectedTable.tableName}
              </Heading>
              <HStack spacing={4}>
                <Badge colorScheme="blue">{selectedTable.area}</Badge>
                <Badge colorScheme="green">Seats {selectedTable.capacity}</Badge>
                <Badge colorScheme="green">Available</Badge>
              </HStack>
              <Text fontSize="sm" color="orange.600" textAlign="center">
                Perfect {selectedCapacity}-seater table in the {selectedTable.area.toLowerCase()} area
              </Text>
            </VStack>
          </CardBody>
        </Card>
      )}
    </VStack>
  )
}
