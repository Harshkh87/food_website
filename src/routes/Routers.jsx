import React from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "../pages/scrollToTop";
import { Toaster } from "react-hot-toast";


const Routers = () => {
  return (
    <React.Suspense>
      <Navbar />

      <Toaster />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
       
        <Route
          path="/transfer"
          element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
