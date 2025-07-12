"use client"

import { useState } from "react"
import {
  Box,
  Grid,
  Text,
  Badge,
  Button,
  HStack,
  VStack,
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Switch,
  FormLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react"
import { Settings, Bell } from "lucide-react"

const AdminPage = () => {
  const [counterServiceEnabled, setCounterServiceEnabled] = useState(false)

  const stats = {
    todayOrders: 45,
    todayRevenue: 12500,
    avgRating: 4.5,
    totalCustomers: 1250,
    pendingOrders: 8,
    completedOrders: 37,
  }

  const recentOrders = [
    {
      id: "ORD001",
      customer: "Rahul Sharma",
      items: "Butter Chicken, Naan x2",
      amount: 520,
      status: "preparing",
      type: "dine-in",
      time: "2 mins ago",
      paymentMethod: "online",
    },
    {
      id: "ORD002",
      customer: "Priya Singh",
      items: "Paneer Tikka, Dal Makhani",
      amount: 450,
      status: "ready",
      type: "pickup",
      time: "5 mins ago",
      paymentMethod: "counter",
    },
    {
      id: "ORD003",
      customer: "Amit Kumar",
      items: "Biryani, Raita",
      amount: 380,
      status: "served",
      type: "dine-in",
      time: "12 mins ago",
      paymentMethod: "online",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "yellow"
      case "ready":
        return "blue"
      case "served":
        return "green"
      default:
        return "gray"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "preparing":
        return "Preparing"
      case "ready":
        return "Ready"
      case "served":
        return "Served"
      default:
        return status
    }
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" shadow="sm" borderBottom="1px" borderColor="gray.200">
        <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
          <Flex align="center" justify="space-between" h="16">
            <HStack spacing={4}>
              <Heading size="lg" color="orange.600">
                Restaurant Admin
              </Heading>
              <Badge colorScheme="gray">Spice Garden</Badge>
            </HStack>
            <HStack spacing={4}>
              <Button variant="ghost" size="sm">
                <Bell size={20} />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings size={20} />
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Box>

      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 6, lg: 8 }} py={8}>
        <Tabs>
          <TabList>
            <Tab>Dashboard</Tab>
            <Tab>Orders</Tab>
            <Tab>Menu</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* Stats Cards */}
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={8}>
                <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                  <Stat>
                    <StatLabel>Today's Orders</StatLabel>
                    <StatNumber>{stats.todayOrders}</StatNumber>
                    <StatHelpText>+12% from yesterday</StatHelpText>
                  </Stat>
                </Box>

                <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                  <Stat>
                    <StatLabel>Today's Revenue</StatLabel>
                    <StatNumber>₹{stats.todayRevenue.toLocaleString()}</StatNumber>
                    <StatHelpText>+8% from yesterday</StatHelpText>
                  </Stat>
                </Box>

                <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                  <Stat>
                    <StatLabel>Average Rating</StatLabel>
                    <StatNumber>{stats.avgRating}</StatNumber>
                    <StatHelpText>Based on 156 reviews</StatHelpText>
                  </Stat>
                </Box>

                <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                  <Stat>
                    <StatLabel>Total Customers</StatLabel>
                    <StatNumber>{stats.totalCustomers}</StatNumber>
                    <StatHelpText>+23 new this week</StatHelpText>
                  </Stat>
                </Box>
              </Grid>

              {/* Recent Orders */}
              <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                <Heading size="md" mb={4}>
                  Recent Orders
                </Heading>
                <VStack spacing={4}>
                  {recentOrders.map((order) => (
                    <Flex
                      key={order.id}
                      align="center"
                      justify="space-between"
                      p={4}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="lg"
                      w="full"
                    >
                      <VStack align="start" flex={1} spacing={1}>
                        <Text fontWeight="semibold">{order.id}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {order.customer}
                        </Text>
                        <Text fontSize="sm">{order.items}</Text>
                        <Text fontSize="xs" color="gray.500">
                          {order.time}
                        </Text>
                      </VStack>

                      <HStack spacing={4}>
                        <VStack align="end" spacing={1}>
                          <Text fontWeight="semibold">₹{order.amount}</Text>
                          <Badge variant="outline">{order.type}</Badge>
                        </VStack>

                        <Badge colorScheme={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>

                        <Badge colorScheme={order.paymentMethod === "online" ? "green" : "orange"}>
                          {order.paymentMethod === "online" ? "Paid" : "Counter"}
                        </Badge>
                      </HStack>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </TabPanel>

            <TabPanel>
              <Flex align="center" justify="space-between" mb={6}>
                <Heading size="xl">Order Management</Heading>
                <HStack spacing={2}>
                  <Badge variant="outline">{stats.pendingOrders} Pending</Badge>
                  <Badge variant="outline">{stats.completedOrders} Completed</Badge>
                </HStack>
              </Flex>

              <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={6}>
                {recentOrders.map((order) => (
                  <Box key={order.id} bg="white" p={6} borderRadius="lg" shadow="sm">
                    <Flex align="center" justify="space-between" mb={4}>
                      <Heading size="md">{order.id}</Heading>
                      <Badge colorScheme={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                    </Flex>

                    <VStack align="start" spacing={4}>
                      <Box>
                        <Text fontWeight="semibold">{order.customer}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {order.items}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {order.time}
                        </Text>
                      </Box>

                      <Flex align="center" justify="space-between" w="full">
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold" fontSize="lg">
                            ₹{order.amount}
                          </Text>
                          <HStack spacing={2}>
                            <Badge variant="outline">{order.type}</Badge>
                            <Badge colorScheme={order.paymentMethod === "online" ? "green" : "orange"}>
                              {order.paymentMethod === "online" ? "Paid Online" : "Counter Payment"}
                            </Badge>
                          </HStack>
                        </VStack>

                        <HStack spacing={2}>
                          {order.status === "preparing" && (
                            <Button size="sm" colorScheme="blue">
                              Mark Ready
                            </Button>
                          )}
                          {order.status === "ready" && order.type === "dine-in" && (
                            <Button size="sm" colorScheme="green">
                              Mark Served
                            </Button>
                          )}
                          {order.status === "ready" && order.type === "pickup" && (
                            <Button size="sm" colorScheme="green">
                              Mark Picked Up
                            </Button>
                          )}
                        </HStack>
                      </Flex>
                    </VStack>
                  </Box>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel>
              <Flex align="center" justify="space-between" mb={6}>
                <Heading size="xl">Menu Management</Heading>
                <Button colorScheme="orange">Add New Item</Button>
              </Flex>

              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                <Box bg="white" p={4} borderRadius="lg" shadow="sm">
                  <HStack spacing={4}>
                    <Box w="20" h="20" bg="gray.200" borderRadius="lg" />
                    <VStack align="start" flex={1} spacing={2}>
                      <HStack spacing={2}>
                        <Box w={3} h={3} borderRadius="full" bg="red.500" />
                        <Text fontWeight="semibold">Butter Chicken</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        Creamy tomato-based curry
                      </Text>
                      <Text fontWeight="bold">₹320</Text>
                      <HStack spacing={2}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" colorScheme="red">
                          Delete
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>

                <Box bg="white" p={4} borderRadius="lg" shadow="sm">
                  <HStack spacing={4}>
                    <Box w="20" h="20" bg="gray.200" borderRadius="lg" />
                    <VStack align="start" flex={1} spacing={2}>
                      <HStack spacing={2}>
                        <Box w={3} h={3} borderRadius="full" bg="green.500" />
                        <Text fontWeight="semibold">Paneer Tikka Masala</Text>
                      </HStack>
                      <Text fontSize="sm" color="gray.600">
                        Grilled cottage cheese in gravy
                      </Text>
                      <Text fontWeight="bold">₹280</Text>
                      <HStack spacing={2}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" colorScheme="red">
                          Delete
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>
              </Grid>
            </TabPanel>

            <TabPanel>
              <Box bg="white" p={6} borderRadius="lg" shadow="sm">
                <Heading size="md" mb={6}>
                  Restaurant Settings
                </Heading>
                <VStack spacing={6}>
                  <Flex
                    align="center"
                    justify="space-between"
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    w="full"
                  >
                    <VStack align="start" spacing={1}>
                      <FormLabel fontWeight="medium">Counter Service</FormLabel>
                      <Text fontSize="sm" color="gray.600">
                        Enable if customers need to collect food from counter after ordering
                      </Text>
                    </VStack>
                    <Switch
                      isChecked={counterServiceEnabled}
                      onChange={(e) => setCounterServiceEnabled(e.target.checked)}
                    />
                  </Flex>

                  {counterServiceEnabled && (
                    <Box p={4} bg="blue.50" border="1px" borderColor="blue.200" borderRadius="lg" w="full">
                      <Heading size="sm" color="blue.800" mb={2}>
                        Counter Service Enabled
                      </Heading>
                      <Text fontSize="sm" color="blue.700">
                        Customers will be notified to collect their orders from the counter when ready. Make sure your
                        staff is informed about this setting.
                      </Text>
                    </Box>
                  )}

                  <Flex
                    align="center"
                    justify="space-between"
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    w="full"
                  >
                    <VStack align="start" spacing={1}>
                      <FormLabel fontWeight="medium">Online Payments</FormLabel>
                      <Text fontSize="sm" color="gray.600">
                        Accept UPI and card payments online
                      </Text>
                    </VStack>
                    <Switch defaultChecked />
                  </Flex>

                  <Flex
                    align="center"
                    justify="space-between"
                    p={4}
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="lg"
                    w="full"
                  >
                    <VStack align="start" spacing={1}>
                      <FormLabel fontWeight="medium">Table Booking</FormLabel>
                      <Text fontSize="sm" color="gray.600">
                        Allow customers to book tables in advance
                      </Text>
                    </VStack>
                    <Switch defaultChecked />
                  </Flex>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}

export default AdminPage
