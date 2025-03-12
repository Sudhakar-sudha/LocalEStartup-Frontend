import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const VerifyEmailPage = () => {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sellerdata/user/verify/${token}`);

        if (response.data && response.data.user) {
          const userData = response.data.user;
          setUser(userData);
          setMessage("Verification successful!");
          setStatus("success");

          // Store user details & timestamp in localStorage
          const sessionData = {
            user: userData,
            token,
            timestamp: new Date().getTime(),
          };
          localStorage.setItem("sellerUser", JSON.stringify(sessionData));

          // Redirect to seller dashboard with token
          setTimeout(() => {
            navigate("/seller", { state: { token } });
          }, 2000);
        }
      } catch (err) {
        setMessage(err.response?.data?.message || "Verification failed.");
        setStatus("error");
        setTimeout(() => navigate("/login"), 3000); // Redirect to login
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Verifying Email...</h2>
      {status === "loading" && <div>Verifying user, please wait...</div>}
      {status === "error" && <div className="text-red-500">❌ {message}</div>}
      {status === "success" && <div className="text-green-600">✅ {message}</div>}
    </div>
  );
};

export default VerifyEmailPage;
