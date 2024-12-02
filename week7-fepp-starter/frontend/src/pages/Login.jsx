import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const email = useField("email");
  const password = useField("password");
  const { login, error } = useLogin("/api/users/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    if (!error) {
      console.log("succes");
    }
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email:</label>
        <input {...email}></input>
        <label>Password</label>
        <input {...password}></input>
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;
