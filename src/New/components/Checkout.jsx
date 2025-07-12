"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, Download, CreditCard, Banknote } from "lucide-react"

const Checkout = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Order Type, 2: Details, 3: Payment, 4: Success
  const [orderType, setOrderType] = useState("") // "pickup" or "dine-in"
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    guests: 1,
  })
  const [paymentMethod, setPaymentMethod] = useState("") // "online" or "counter"
  const [paymentStatus, setPaymentStatus] = useState("") // "success" or "pending"
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    // Get cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    } else {
      // Redirect to home if no cart
      navigate("/")
    }
  }, [navigate])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  const handleOrderTypeNext = () => {
    if (orderType) {
      setStep(2)
    }
  }

  const handleDetailsNext = () => {
    if (customerDetails.name && customerDetails.phone) {
      setStep(3)
    }
  }

  const handlePayment = () => {
    if (paymentMethod === "online") {
      // Simulate online payment
      setTimeout(() => {
        setPaymentStatus("success")
        setStep(4)
      }, 2000)
    } else if (paymentMethod === "counter") {
      setPaymentStatus("pending")
      setStep(4)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-orange-600">Checkout</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Order Type Selection */}
            {step === 1 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">How would you like to receive your order?</h2>
                <div className="space-y-4">
                  <div
                    className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                      orderType === "pickup" ? "border-orange-500 bg-orange-50" : ""
                    }`}
                    onClick={() => setOrderType("pickup")}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value="pickup"
                      checked={orderType === "pickup"}
                      onChange={() => setOrderType("pickup")}
                    />
                    <div>
                      <h3 className="font-medium">Pickup</h3>
                      <p className="text-sm text-gray-600">Collect your order from the restaurant counter</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                      orderType === "dine-in" ? "border-orange-500 bg-orange-50" : ""
                    }`}
                    onClick={() => setOrderType("dine-in")}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value="dine-in"
                      checked={orderType === "dine-in"}
                      onChange={() => setOrderType("dine-in")}
                    />
                    <div>
                      <h3 className="font-medium">Dine-in</h3>
                      <p className="text-sm text-gray-600">Enjoy your meal at the restaurant</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleOrderTypeNext}
                  className={`w-full mt-6 py-3 px-4 rounded-md ${
                    orderType
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!orderType}
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Customer Details */}
            {step === 2 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Customer Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name *</label>
                      <input
                        type="text"
                        value={customerDetails.name}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            name: e.target.value,
                          })
                        }
                        placeholder="Enter your name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Enter phone number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
                      <input
                        type="tel"
                        value={customerDetails.whatsapp}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            whatsapp: e.target.value,
                          })
                        }
                        placeholder="WhatsApp number (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            email: e.target.value,
                          })
                        }
                        placeholder="Email address (optional)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  {orderType === "dine-in" && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Number of Guests</label>
                      <input
                        type="number"
                        min="1"
                        value={customerDetails.guests}
                        onChange={(e) =>
                          setCustomerDetails({
                            ...customerDetails,
                            guests: Number.parseInt(e.target.value) || 1,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleDetailsNext}
                      className={`flex-1 py-2 px-4 rounded-md ${
                        customerDetails.name && customerDetails.phone
                          ? "bg-orange-600 text-white hover:bg-orange-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!customerDetails.name || !customerDetails.phone}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div
                    className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                      paymentMethod === "online" ? "border-orange-500 bg-orange-50" : ""
                    }`}
                    onClick={() => setPaymentMethod("online")}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                    />
                    <CreditCard className="w-5 h-5" />
                    <div>
                      <h3 className="font-medium">Online Payment</h3>
                      <p className="text-sm text-gray-600">Pay now using UPI, Card, or Net Banking</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                      paymentMethod === "counter" ? "border-orange-500 bg-orange-50" : ""
                    }`}
                    onClick={() => setPaymentMethod("counter")}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="counter"
                      checked={paymentMethod === "counter"}
                      onChange={() => setPaymentMethod("counter")}
                    />
                    <Banknote className="w-5 h-5" />
                    <div>
                      <h3 className="font-medium">Pay at Counter</h3>
                      <p className="text-sm text-gray-600">Pay when you collect/receive your order</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    className={`flex-1 py-2 px-4 rounded-md ${
                      paymentMethod
                        ? "bg-orange-600 text-white hover:bg-orange-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!paymentMethod}
                  >
                    {paymentMethod === "online" ? "Pay Now" : "Place Order"}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>

                {paymentStatus === "success" && (
                  <div>
                    <p className="text-gray-600 mb-4">Payment completed successfully</p>
                    <button className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 mb-4">
                      <Download className="w-4 h-4 mr-2 inline" />
                      Download Invoice
                    </button>
                  </div>
                )}

                {paymentStatus === "pending" && (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Your order has been sent to the restaurant. Please pay at the counter.
                    </p>
                    <div className="bg-gray-100 px-4 py-2 rounded-md inline-block mb-4">
                      Order ID: #ORD-{Date.now()}
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  <p>Order Type: {orderType === "pickup" ? "Pickup" : "Dine-in"}</p>
                  <p>Estimated Time: 20-25 minutes</p>
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      {item.notes && <p className="text-xs text-gray-500 italic">Note: {item.notes}</p>}
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <hr className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{gst}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
