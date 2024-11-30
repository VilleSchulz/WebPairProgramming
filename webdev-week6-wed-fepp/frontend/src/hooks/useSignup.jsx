import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const useSignup = (setIsAuthenticated) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signup = async (email, password) => {
        setError(null);
        try {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                sessionStorage.setItem("user", JSON.stringify(user));
                console.log("User signed up successfully!");
                setIsAuthenticated(true);
                navigate("/");
            } else {
                const json = await response.json();
                console.error("Signup failed", response);
                setError(await json.error);
            }
        } catch (error) {
            console.error("Error during signup:", error);
        }
    }

    return { signup, error };
}
