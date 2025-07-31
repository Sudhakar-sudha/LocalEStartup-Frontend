import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SellerProvider } from "./Products/SellerContext";
import HomeSection from "./Components/HomeSection";
import Register from "./Components/Register";
import Login from "./Components/Login";
import OTPVerification from './Components/OTPVerification';
import OTPVerify from './Admin/OTPVerify';
import ProtectedRoute from './Components/ProtectedRoute';
import SellerLayout from './Products/SellerLayout';
import SellerDashboard from './Products/SellerDashboard';
import SellerDetails from './Products/SellerDetails';
import AddProducts from './Products/AddProducts';
import ListProducts from './Products/ListProducts';
import OrderedProducts from './Products/OrderedProducts';
import DeliveryStatus from './Products/DeliveryStatus';
import Home from './Admin/Home';
import Customers from './Admin/Customers';
import Deliveryboy from './Admin/Deliveryboy';
import Orders from './Admin/Orders';
import Products from './Admin/Products';
import ProductSellers from './Admin/ProductSellers'
import AdminLayout from './Admin/AdminLayout';
import Payments from './Admin/Payments';
import EditProduct from './Products/EditProduct';
import AdminLogin from './Admin/AdminLogin';
import ApprovedProducts from './Admin/ApprovedProducts';
import PendingProducts from './Admin/PendingProducts';
import RejectedProducts from './Admin/RejectedProducts';
import AdminProductApproval from './Admin/AdminProductApproval';
import LocalEStartup from './Components/LocalEStartup';
import Ecommerce from './Components/Ecommerce';
import TrainingGuidance from './Components/TrainingForm';
import FreelancerAdmin from './Components/FreelancerAdmin'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocalEStartup />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/trainingcontact" element={<TrainingGuidance />} />
        <Route path="/localestartupAdmin" element={<FreelancerAdmin/>} />
        <Route path="/selling" element={<HomeSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sellerlogin" element={<Login />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/otp-verify" element={<OTPVerify />} />
        <Route path="/adminlogin" element={<AdminLogin />} />


                <Route path="/admin" element={<ProtectedRoute role="admin" />}>
                  <Route
                    element={
                      <SellerProvider>
                        <AdminLayout />
                      </SellerProvider>
                    }>
                    <Route index element={<Home />} />
                    <Route path="admindashboard" element={<Home />} />
                    <Route path="sellerdetails" element={<ProductSellers />} />
                    <Route path="customerdetails" element={<Customers />} />
                    <Route path="deliverydetails" element={<Deliveryboy />} />
                        <Route path="products" element={<Products />}>
                              <Route index element={<AdminProductApproval />} />  {/* Default: AdminProductApproval */}
                              <Route path="pending" element={<PendingProducts />} />
                              <Route path="approved" element={<ApprovedProducts />} />
                              <Route path="rejected" element={<RejectedProducts />} />
                        </Route>
                    <Route path="orders" element={<Orders />} />
                    <Route path="payments" element={<Payments />} />
                  </Route>
                </Route>




                <Route path="/seller" element={<ProtectedRoute role="seller" />}>
                  <Route
                    element={
                      <SellerProvider>
                        <SellerLayout />
                      </SellerProvider>
                    }
                  >
                    <Route index element={<SellerDashboard />} />
                    <Route path="dashboard" element={<SellerDashboard />} />
                    <Route path="details" element={<SellerDetails />} />
                    <Route path="add-products" element={<AddProducts />} />
                    <Route path="view-products" element={<ListProducts />} />
                    <Route path="update-products" element={<EditProduct />} />
                    <Route path="ordered-products" element={<OrderedProducts />} />
                    <Route path="delivery" element={<DeliveryStatus />} />
                  </Route>
                </Route>


      </Routes>
    </Router>
  );
};

export default App;
