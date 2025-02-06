import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/Navbar";

// Import pages
import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

// Import authentication pages
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to toggle sidebar

  return (
    <div className="flex h-screen bg-gray-100 text-black overflow-hidden">
      {/* Sidebar (Collapsible on Mobile) */}
      {isAuthenticated && (
        <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        {isAuthenticated && <Navbar setSidebarOpen={setSidebarOpen} />}

        {/* Page Content */}
        <div className="p-4 flex-1 overflow-auto">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/overview" /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {isAuthenticated && (
              <>
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
