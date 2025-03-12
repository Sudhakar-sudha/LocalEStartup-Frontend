import { createContext, useState, useEffect } from "react";

export const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem("sellerUser"));
    if (sessionData && sessionData.user) {
      setSeller(sessionData.user);
    }
  }, []);

  return (
    <SellerContext.Provider value={{ seller, setSeller }}>
      {children}
    </SellerContext.Provider>
  );
};
