import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const adminSession = JSON.parse(localStorage.getItem("adminUser"));
  const sellerSession = JSON.parse(localStorage.getItem("sellerUser"));

  if (role === "admin") {
    return adminSession ? <Outlet /> : <Navigate to="/adminlogin" />;
  }

  if (role === "seller") {
    return sellerSession ? <Outlet /> : <Navigate to="/sellerlogin" />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;

