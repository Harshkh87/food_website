"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Building2, Users, DollarSign, TrendingUp, CheckCircle, XCircle, MessageSquare, Bell } from "lucide-react"

// Mock data
const platformStats = {
  totalRestaurants: 156,
  activeUsers: 12500,
  monthlyRevenue: 450000,
  pendingApprovals: 8,
}

const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    owner: "John Doe",
    status: "verified",
    orders: 245,
    revenue: 45000,
    rating: 4.5,
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Pizza Corner",
    owner: "Jane Smith",
    status: "pending",
    orders: 0,
    revenue: 0,
    rating: 0,
    joinDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Burger Hub",
    owner: "Mike Johnson",
    status: "verified",
    orders: 189,
    revenue: 32000,
    rating: 4.2,
    joinDate: "2024-01-10",
  },
]

const revenueData = [
  { month: "Jan", revenue: 380000, commission: 7600 },
  { month: "Feb", revenue: 420000, commission: 8400 },
  { month: "Mar", revenue: 450000, commission: 9000 },
  { month: "Apr", revenue: 480000, commission: 9600 },
  { month: "May", revenue: 520000, commission: 10400 },
  { month: "Jun", revenue: 580000, commission: 11600 },
]

const statusData = [
  { name: "Verified", value: 148, color: "#10b981" },
  { name: "Pending", value: 8, color: "#f59e0b" },
]

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [globalSettings, setGlobalSettings] = useState({
    newRegistrations: true,
    autoApproval: false,
    maintenanceMode: false,
    aiFeatures: true,
  })

  const [commissionRates, setCommissionRates] = useState({
    normalOrders: 2,
    birthdayBookings: 5,
  })

  const approveRestaurant = (restaurantId) => {
    console.log(`Approving restaurant ${restaurantId}`)
  }

  const rejectRestaurant = (restaurantId) => {
    console.log(`Rejecting restaurant ${restaurantId}`)
  }

  const toggleGlobalSetting = (setting) => {
    setGlobalSettings((prev) => ({
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
            <h1 className="text-2xl font-bold text-orange-600">Super Admin Panel</h1>
            <div className="flex items-center gap-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Platform Owner</span>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex border-b mb-6 overflow-x-auto">
          {["overview", "restaurants", "users", "finance", "marketing", "settings"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium capitalize whitespace-nowrap ${
                activeTab === tab ? "border-b-2 border-orange-500 text-orange-600" : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Restaurants</p>
                    <p className="text-2xl font-bold">{platformStats.totalRestaurants}</p>
                    <p className="text-xs text-green-600">+12 this month</p>
                  </div>
                  <Building2 className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold">{platformStats.activeUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+8% from last month</p>
                  </div>
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold">₹{platformStats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+15% from last month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-gray-400" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                    <p className="text-2xl font-bold">{platformStats.pendingApprovals}</p>
                    <p className="text-xs text-red-600">Requires attention</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">Platform Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#f97316" />
                    <Bar dataKey="commission" fill="#059669" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4">Restaurant Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Restaurants Tab */}
        {activeTab === "restaurants" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-6">Restaurant Management</h3>
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{restaurant.name}</h4>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          restaurant.status === "verified"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {restaurant.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Owner: {restaurant.owner}</p>
                    <p className="text-sm text-gray-500">
                      Orders: {restaurant.orders} | Revenue: ₹{restaurant.revenue.toLocaleString()} | Rating:{" "}
                      {restaurant.rating}
                    </p>
                    <p className="text-xs text-gray-400">Joined: {restaurant.joinDate}</p>
                  </div>
                  <div className="flex gap-2">
                    {restaurant.status === "pending" && (
                      <>
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                          onClick={() => approveRestaurant(restaurant.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                          onClick={() => rejectRestaurant(restaurant.id)}
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                    {restaurant.status === "verified" && (
                      <button className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50">
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finance Tab */}
        {activeTab === "finance" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-6">Commission Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Normal Orders Commission (%)</label>
                  <input
                    type="number"
                    value={commissionRates.normalOrders}
                    onChange={(e) =>
                      setCommissionRates({
                        ...commissionRates,
                        normalOrders: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Birthday Bookings Commission (%)</label>
                  <input
                    type="number"
                    value={commissionRates.birthdayBookings}
                    onChange={(e) =>
                      setCommissionRates({
                        ...commissionRates,
                        birthdayBookings: Number.parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <button className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700">
                Update Commission Rates
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-6">Platform Revenue</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-600">This Month</h4>
                  <p className="text-2xl font-bold">₹11,600</p>
                  <p className="text-sm text-green-600">+15% from last month</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-600">This Quarter</h4>
                  <p className="text-2xl font-bold">₹32,400</p>
                  <p className="text-sm text-green-600">+22% from last quarter</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-600">This Year</h4>
                  <p className="text-2xl font-bold">₹98,200</p>
                  <p className="text-sm text-green-600">+18% from last year</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Marketing Tab */}
        {activeTab === "marketing" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-6">Marketing & Communication</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border p-6 rounded-lg">
                <h4 className="font-medium mb-2">WhatsApp Broadcast</h4>
                <p className="text-sm text-gray-600 mb-4">Send messages to all users</p>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Create Broadcast
                </button>
              </div>

              <div className="border p-6 rounded-lg">
                <h4 className="font-medium mb-2">Push Notifications</h4>
                <p className="text-sm text-gray-600 mb-4">Send app notifications</p>
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                  <Bell className="w-4 h-4" />
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-6">Global Platform Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Restaurant Registrations</h4>
                  <p className="text-sm text-gray-600">Allow new restaurants to register</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={globalSettings.newRegistrations}
                    onChange={() => toggleGlobalSetting("newRegistrations")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto Approval</h4>
                  <p className="text-sm text-gray-600">Automatically approve new restaurants</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={globalSettings.autoApproval}
                    onChange={() => toggleGlobalSetting("autoApproval")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Maintenance Mode</h4>
                  <p className="text-sm text-gray-600">Put platform in maintenance mode</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={globalSettings.maintenanceMode}
                    onChange={() => toggleGlobalSetting("maintenanceMode")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">AI Features</h4>
                  <p className="text-sm text-gray-600">Enable AI-powered features globally</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={globalSettings.aiFeatures}
                    onChange={() => toggleGlobalSetting("aiFeatures")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>

              <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700">
                Save Global Settings
              </button>
            </div>
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {!["overview", "restaurants", "finance", "marketing", "settings"].includes(activeTab) && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-4 capitalize">{activeTab} Management</h3>
            <p className="text-gray-600">{activeTab} management interface will be implemented here...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SuperAdmin
