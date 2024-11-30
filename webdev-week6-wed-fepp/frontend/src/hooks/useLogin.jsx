import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useLogin = (setIsAuthenticated) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        console.log("User logged in successfully!");
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Login failed", response);
        setError(response.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
   
  };
  return {login,error}
};
export default useLogin;
