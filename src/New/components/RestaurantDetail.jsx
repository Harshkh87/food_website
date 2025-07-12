"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Star, MapPin, Clock, Phone, Leaf, Drumstick, Plus, Minus, ShoppingCart } from "lucide-react"

// Mock restaurant data
const restaurant = {
  id: 1,
  name: "Spice Garden",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=300&fit=crop",
  rating: 4.5,
  reviews: 1250,
  cuisine: "Indian, Chinese",
  address: "123 Food Street, City Center",
  phone: "+91 9876543210",
  hours: "10:00 AM - 11:00 PM",
  isOpen: true,
}

// Mock menu data with veg/non-veg items
const menuCategories = [
  {
    name: "Starters",
    items: [
      {
        id: 1,
        name: "Paneer Tikka",
        description: "Grilled cottage cheese with spices",
        price: 180,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=100&h=100&fit=crop",
        isVeg: true,
        tags: ["Bestseller", "Spicy"],
      },
      {
        id: 2,
        name: "Chicken Tikka",
        description: "Grilled chicken with aromatic spices",
        price: 220,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=100&h=100&fit=crop",
        isVeg: false,
        tags: ["Spicy", "Popular"],
      },
      {
        id: 3,
        name: "Veg Spring Rolls",
        description: "Crispy rolls with fresh vegetables",
        price: 150,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=100&h=100&fit=crop",
        isVeg: true,
        tags: ["Crispy"],
      },
    ],
  },
  {
    name: "Main Course",
    items: [
      {
        id: 4,
        name: "Butter Chicken",
        description: "Creamy tomato-based chicken curry",
        price: 280,
        image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=100&h=100&fit=crop",
        isVeg: false,
        tags: ["Bestseller", "Creamy"],
      },
      {
        id: 5,
        name: "Dal Makhani",
        description: "Rich and creamy black lentils",
        price: 200,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&h=100&fit=crop",
        isVeg: true,
        tags: ["Bestseller", "Creamy"],
      },
      {
        id: 6,
        name: "Biryani",
        description: "Fragrant basmati rice with spices",
        price: 250,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=100&h=100&fit=crop",
        isVeg: true,
        tags: ["Aromatic", "Popular"],
      },
    ],
  },
]

const RestaurantDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [vegFilter, setVegFilter] = useState("all") // "all", "veg", "nonveg"
  const [selectedCategory, setSelectedCategory] = useState("Starters")
  const [itemNotes, setItemNotes] = useState({})

  // Filter items based on veg/non-veg selection
  const getFilteredItems = (items) => {
    if (vegFilter === "veg") return items.filter((item) => item.isVeg)
    if (vegFilter === "nonveg") return items.filter((item) => !item.isVeg)
    return items
  }

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1, notes: itemNotes[item.id] || "" }])
    }
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.id !== itemId))
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const getItemQuantity = (itemId) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    // Store cart in localStorage for checkout page
    localStorage.setItem("cart", JSON.stringify(cart))
    navigate("/checkout")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-orange-600 cursor-pointer" onClick={() => navigate("/")}>
              FoodieHub
            </h1>
            <div className="flex items-center gap-4">
              <button className="relative bg-transparent border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({getTotalItems()})</span>
                </div>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Restaurant Info */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={restaurant.image || "/placeholder.svg"}
                alt={restaurant.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="text-gray-500">({restaurant.reviews} reviews)</span>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    restaurant.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {restaurant.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{restaurant.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Menu</h2>

            {/* Veg/Non-Veg Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  className={`px-3 py-1 rounded text-xs ${
                    vegFilter === "all" ? "bg-white shadow" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setVegFilter("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${
                    vegFilter === "veg" ? "bg-white shadow" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setVegFilter("veg")}
                >
                  <Leaf className="w-3 h-3 text-green-600" />
                  Veg
                </button>
                <button
                  className={`px-3 py-1 rounded text-xs flex items-center gap-1 ${
                    vegFilter === "nonveg" ? "bg-white shadow" : "hover:bg-gray-200"
                  }`}
                  onClick={() => setVegFilter("nonveg")}
                >
                  <Drumstick className="w-3 h-3 text-red-600" />
                  Non-Veg
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex border-b mb-6">
            {menuCategories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 font-medium ${
                  selectedCategory === category.name
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid gap-4">
            {menuCategories.find((cat) => cat.name === selectedCategory)?.items &&
              getFilteredItems(menuCategories.find((cat) => cat.name === selectedCategory).items).map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {item.isVeg ? (
                              <Leaf className="w-4 h-4 text-green-600" />
                            ) : (
                              <Drumstick className="w-4 h-4 text-red-600" />
                            )}
                            <h3 className="font-semibold">{item.name}</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                          <div className="flex gap-1 mb-2">
                            {item.tags.map((tag, index) => (
                              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{item.price}</p>
                        </div>
                      </div>

                      {/* Special Instructions */}
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Special instructions (e.g., less spicy, no onions)"
                          value={itemNotes[item.id] || ""}
                          onChange={(e) =>
                            setItemNotes({
                              ...itemNotes,
                              [item.id]: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      {/* Add to Cart Controls */}
                      <div className="flex items-center justify-between">
                        {getItemQuantity(item.id) === 0 ? (
                          <button
                            onClick={() => addToCart(item)}
                            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700"
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <div className="flex items-center gap-3 w-full">
                            <button
                              className="border border-gray-300 p-2 rounded-md hover:bg-gray-50"
                              onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium px-4">{getItemQuantity(item.id)}</span>
                            <button
                              className="border border-gray-300 p-2 rounded-md hover:bg-gray-50"
                              onClick={() => updateQuantity(item.id, getItemQuantity(item.id) + 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Summary */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="font-medium">{getTotalItems()} items</p>
              <p className="text-lg font-bold">₹{getTotalPrice()}</p>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-orange-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-orange-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RestaurantDetail
