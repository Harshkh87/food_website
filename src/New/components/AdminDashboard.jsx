"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { DollarSign, ShoppingBag, Users, Calendar } from "lucide-react"

// Mock data
const dashboardStats = {
  todayOrders: 45,
  todayRevenue: 12500,
  totalCustomers: 1250,
  pendingBookings: 8,
}

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    items: "Paneer Tikka, Dal Makhani",
    amount: 480,
    status: "preparing",
    type: "dine-in",
    time: "2 mins ago",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    items: "Butter Chicken, Naan",
    amount: 350,
    status: "ready",
    type: "pickup",
    time: "5 mins ago",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    items: "Biryani, Raita",
    amount: 280,
    status: "completed",
    type: "dine-in",
    time: "10 mins ago",
  },
]

const weeklyData = [
  { day: "Mon", orders: 32, revenue: 8500 },
  { day: "Tue", orders: 28, revenue: 7200 },
  { day: "Wed", orders: 35, revenue: 9100 },
  { day: "Thu", orders: 42, revenue: 11200 },
  { day: "Fri", orders: 48, revenue: 12800 },
  { day: "Sat", orders: 55, revenue: 14500 },
  { day: "Sun", orders: 38, revenue: 9800 },
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [restaurantSettings, setRestaurantSettings] = useState({
    tableService: true,
    counterPickup: false,
    onlinePayment: true,
    birthdayBooking: true,
    kotPrinting: true,
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-500"
      case "ready":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const updateOrderStatus = (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  const toggleSetting = (setting) => {
    setRestaurantSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-orange-600">Restaurant Admin</h1>
            <div className="flex items-center gap-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Spice Garden</span>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          {["dashboard", "orders", "menu", "bookings", "settings"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium capitalize ${
                activeTab === tab ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                    <p className="text-2xl font-bold">{dashboardStats.todayOrders}</p>
                    <p className="text-xs text-green-600">+12% from yesterday</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                    <p className="text-2xl font-bold">₹{dashboardStats.todayRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+8% from yesterday</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold">{dashboardStats.totalCustomers}</p>
                    <p className="text-xs text-green-600">+5% this month</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                    <p className="text-2xl font-bold">{dashboardStats.pendingBookings}</p>
                    <p className="text-xs text-red-600">Requires attention</p>
                  </div>
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">Weekly Orders</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">Weekly Revenue</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{order.id}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{order.type}</span>
                        <span className={`${getStatusColor(order.status)} text-white px-2 py-1 rounded text-xs`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.items}</p>
                      <p className="text-xs text-gray-400">{order.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{order.amount}</p>
                      <div className="flex gap-2 mt-2">
                        {order.status === "preparing" && (
                          <button
                            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            onClick={() => updateOrderStatus(order.id, "ready")}
                          >
                            Mark Ready
                          </button>
                        )}
                        {order.status === "ready" && (
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            onClick={() => updateOrderStatus(order.id, "completed")}
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-6">Restaurant Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Table Service</h4>
                  <p className="text-sm text-gray-600">Enable table service for dine-in customers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={restaurantSettings.tableService}
                    onChange={() => toggleSetting("tableService")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Counter Pickup Required</h4>
                  <p className="text-sm text-gray-600">Customers must collect food from counter</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={restaurantSettings.counterPickup}
                    onChange={() => toggleSetting("counterPickup")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Online Payment</h4>
                  <p className="text-sm text-gray-600">Accept online payments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={restaurantSettings.onlinePayment}
                    onChange={() => toggleSetting("onlinePayment")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Birthday Bookings</h4>
                  <p className="text-sm text-gray-600">Allow birthday party bookings</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={restaurantSettings.birthdayBooking}
                    onChange={() => toggleSetting("birthdayBooking")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">KOT Printing</h4>
                  <p className="text-sm text-gray-600">Automatic kitchen order ticket printing</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={restaurantSettings.kotPrinting}
                    onChange={() => toggleSetting("kotPrinting")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700">
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {activeTab !== "dashboard" && activeTab !== "settings" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-4 capitalize">{activeTab} Management</h3>
            <p className="text-gray-600">{activeTab} management interface will be implemented here...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
