"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./components/HomePage"
import RestaurantDetail from "./components/RestaurantDetail"
import Checkout from "./components/Checkout"
import AdminDashboard from "./components/AdminDashboard"
import SuperAdmin from "./components/SuperAdmin"
import "./App.css"

function Routing() {
  // const [user, setUser] = useState(null)
  // const [userRole, setUserRole] = useState("customer") // customer, admin, super-admin

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/super-admin" element={<SuperAdmin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default Routing
