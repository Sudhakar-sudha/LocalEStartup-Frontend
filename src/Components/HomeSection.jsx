import React , { useState }  from "react";
import SlideShow from "./SlideShow";
import slide1 from "../assets/slide1seller.png";
import slide2 from "../assets/slide2seller.png";
import slide3 from "../assets/slide3seller.png";
import slide4 from "../assets/slide4seller.png";
import slide5 from "../assets/slide5seller.png";
import slide6 from "../assets/slide6seller.png";
import Login from "./Login";
import Navbar from './Navbar';
import { Link } from "react-router-dom"
const HomeSection = () => {
  const [showLogin, setShowLogin] = useState(false);
  const slides = [slide1, slide2, slide3, slide4, slide5, slide6];

  return (
    <div>
    <Navbar  setShowLogin={setShowLogin}/>

      <div className="flex">
        {/* Slideshow */}
      
        <SlideShow slides={slides} />
    

      {/* Content Section */}
      <div className="w-1/2 h-screen flex items-center justify-center">
          {!showLogin ? (
      <div 
      className="p-10 text-xl "
    >
      <div className="text-4xl p-4 text-blue-700 font-bold -mt-20">
      Begin your selling journey on LocalEStartup
        </div>
      <p className=" bg-opacity-70 p-4 rounded-lg pb-9">
      Login or register as a seller on  LocalEStartup  , with your basic details like name, email, phone number, and bank information. List your products by adding their name, price, description, stock, and high-quality images. Choose a delivery method—either handled by LocalEStartup or managed by you. Once your products are live, customers can easily purchase them, and you can track orders through the dashboard. Payments are securely transferred to your bank account. Keep your listings updated and respond to customer inquiries to ensure smooth sales.
      </p>

            <Link
              to="/register"
              className="px-4 py-2 ml-4   text-white text-2xl transition duration-300 bg-orange-400 rounded-lg"
            >
              Start Selling
            </Link>

    </div>
    
          ) : (
            <Login />
          )}
        </div>
     
        
      </div>
    </div>
  );
};

export default HomeSection;