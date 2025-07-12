"use client";

import { useParams } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Homepage from "../components/Homepage";
import RestaurantDetail from "../components/RestaurantDetail";
import PartnerWithUs from "../components/PartnerWithUs";
import PremiumPlans from "../components/PremiumPlans";
import Contact from "../components/Contact";
import { mockRestaurants } from "../data/mockData";
import BirthdayBooking from "../components/BirthdayBooking";
import CartCheckout from "../components/CartCheckout";
import TableService from "../components/TableService";
import TableBooking from "../components/TableBooking";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import LoginSignup from "../components/LoginSignup";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  // Handle initial app load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // useCallback to stabilize reference and prevent infinite useEffect
  const handleRestaurantLoad = useCallback((restaurantId) => {
    console.log("Loading restaurant:", restaurantId);
    const restaurant = mockRestaurants.find(
      (r) => r.id === Number.parseInt(restaurantId)
    );
    setCurrentRestaurant(restaurant);
    setIsPageLoading(true);

    setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);
  }, []);

  if (isInitialLoading) {
    return (
      <ChakraProvider>
        <LoadingScreen
          type="initial"
          isVisible={isInitialLoading}
          onComplete={() => setIsInitialLoading(false)}
        />
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Router>
        {/* Page Loading Screen */}
        <LoadingScreen
          type="restaurant"
          restaurant={currentRestaurant}
          isVisible={isPageLoading}
          onComplete={() => setIsPageLoading(false)}
        />

        <Navbar cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Homepage restaurants={mockRestaurants} />} />
          <Route
            path="/restaurant/:id"
            element={
              <RestaurantDetailWrapper
                restaurants={mockRestaurants}
                addToCart={addToCart}
                onRestaurantLoad={handleRestaurantLoad}
              />
            }
          />
          <Route path="/partner" element={<PartnerWithUs />} />
          <Route path="/premium" element={<PremiumPlans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/birthday-booking/:id" element={<BirthdayBooking />} />
          <Route path="/cart" element={<CartCheckout cartItems={cartItems} />} />
          <Route path="/table-service/:id" element={<TableService />} />
          <Route path="/table-booking/:id" element={<TableBooking />} />
          <Route path="/login" element={<LoginSignup mode="login" />} />
          <Route path="/signup" element={<LoginSignup mode="signup" />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

// Wrapper component to handle restaurant loading
function RestaurantDetailWrapper({ restaurants, addToCart, onRestaurantLoad }) {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log("RestaurantDetailWrapper useEffect triggered with id:", id);
      onRestaurantLoad(id);
    }
  }, [id, onRestaurantLoad]);

  return <RestaurantDetail restaurants={restaurants} addToCart={addToCart} />;
}
