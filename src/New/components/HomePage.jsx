"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Star, Search, MapPin, Clock, Phone } from "lucide-react"

// Mock data
const restaurants = [
  {
    id: 1,
    name: "Spice Garden",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
    rating: 4.5,
    cuisine: "Indian",
    distance: "0.5 km",
    time: "25-30 min",
    isOpen: true,
    offers: ["20% OFF", "Free Delivery"],
  },
  {
    id: 2,
    name: "Pizza Corner",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
    rating: 4.2,
    cuisine: "Italian",
    distance: "1.2 km",
    time: "30-35 min",
    isOpen: true,
    offers: ["Buy 1 Get 1"],
  },
  {
    id: 3,
    name: "Burger Hub",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop",
    rating: 4.0,
    cuisine: "Fast Food",
    distance: "0.8 km",
    time: "20-25 min",
    isOpen: false,
    offers: [],
  },
]

const categories = [
  { name: "Top Rated", icon: "⭐" },
  { name: "Veg Only", icon: "🥗" },
  { name: "Fast Food", icon: "🍔" },
  { name: "Indian", icon: "🍛" },
  { name: "Chinese", icon: "🥢" },
  { name: "Desserts", icon: "🍰" },
]

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const navigate = useNavigate()

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-orange-600">FoodieHub</h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Login</button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">Sign Up</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Delicious Food, Delivered Fresh</h2>
          <p className="text-xl mb-8">Order from your favorite restaurants</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search restaurants, dishes, or areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 py-3 text-lg rounded-md text-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`cursor-pointer hover:shadow-md transition-shadow p-4 bg-white rounded-lg border text-center ${
                  selectedCategory === category.name ? "ring-2 ring-orange-500" : ""
                }`}
                onClick={() => setSelectedCategory(category.name === selectedCategory ? "" : category.name)}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <p className="font-medium">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6">Featured Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleRestaurantClick(restaurant.id)}
              >
                <div className="relative">
                  <img
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {restaurant.offers.length > 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">{restaurant.offers[0]}</span>
                    </div>
                  )}
                  {!restaurant.isOpen && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center">
                      <span className="text-white font-bold">CLOSED</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{restaurant.name}</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.time}</span>
                    </div>
                  </div>
                  <button
                    className={`w-full mt-4 py-2 px-4 rounded-md ${
                      restaurant.isOpen
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!restaurant.isOpen}
                  >
                    {restaurant.isOpen ? "View Menu" : "Closed"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-8 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6">Today's Best Offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-2">20% OFF</h4>
              <p className="mb-4">On orders above ₹299</p>
              <button className="bg-white text-green-600 px-4 py-2 rounded-md font-medium">Apply Now</button>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-2">Buy 1 Get 1</h4>
              <p className="mb-4">On selected pizzas</p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium">Apply Now</button>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-2">Free Dessert</h4>
              <p className="mb-4">With any main course</p>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium">Apply Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-bold text-lg mb-4">FoodieHub</h5>
              <p className="text-gray-300">Your favorite food delivery platform</p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">For Restaurants</h6>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Partner with us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Restaurant Login
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Contact</h6>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+91 9876543210</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
