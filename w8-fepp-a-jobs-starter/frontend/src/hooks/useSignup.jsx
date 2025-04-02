import { useState } from "react";
import { useAuth } from "./useAuth";
export default function useSignup(url) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Changed to false by default
  const { setUser } = useAuth(); // Use the context's setUser function to update auth state
  const signup = async (object) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });
      const user = await response.json();

      if (!response.ok) {
        setError(user.error);
        setUser(user);
        return null; // Return null on error
      }

      // Save user data to localStorage
      sessionStorage.setItem("user", JSON.stringify(user));

      setIsLoading(false);
      return user; // Return user data on success
    } catch (err) {
      setError("An error occurred while logging in."); // Handle unexpected errors
      setIsLoading(false);
      return null; // Return null on exception
    }
  };

  return { signup, isLoading, error };
}
