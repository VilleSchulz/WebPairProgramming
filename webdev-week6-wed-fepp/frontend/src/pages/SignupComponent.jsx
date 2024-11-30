import { useState, useEffect } from "react";
import { useSignup } from "../hooks/useSignup";

const SignupComponent = ({ setIsAuthenticated }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordsMatchText, setPasswordsMatchText] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { error, signup } = useSignup(setIsAuthenticated);

  const handleSignup = async () => {
      if (passwordsMatch) {
          await signup(email, password);
      }
  };
  
  useEffect(() => {
    if (password !== password2 || !password){
      !password ? setPasswordsMatchText("Type password") : setPasswordsMatchText("Passwords do not match");
      setPasswordsMatch(false)
    }
    else {
      setPasswordsMatchText("");
      setPasswordsMatch(true);
    }
    
  },[password, password2, passwordsMatchText, passwordsMatch])

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <label>
        email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && error.includes("Email") ? error : ""}
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && error.includes("Password") ? error : ""}
      </label>
      <label>
        Retype password:
        <input
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          />
      </label>
          <p style={{color: "red"}} >{passwordsMatchText}</p>
      <br />
        <button disabled={!passwordsMatch} style={!passwordsMatch ? {color: "red", backgroundColor: "gray"} : {} } onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupComponent;
