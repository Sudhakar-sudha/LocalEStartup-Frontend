
// export default Products;


import { Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div className="p-4">
      <Outlet /> {/* ✅ This will render the correct child route */}
    </div>
  );
};

export default Products;
