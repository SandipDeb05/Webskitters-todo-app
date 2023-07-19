import { useAuth } from "@/context/authContext";
import React, { useState } from "react";

const Login = () => {
  const { login, signup, currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const submitHandler = async () => {
    if (!email || !password) {
      setError("All fields are requide");
      return;
    }
    if (isLoggedIn) {
      try {
        return await login(email, password);
      } catch (error) {
        setError("Incorrect email and password");
      }
    } else {
      try {
        await signup(email, password);
      } catch (error) {
        setError("Email and password already in use");
      }
    }
  };

  return (
    <div>
      <h2>{isLoggedIn ? "Login" : "Register"}</h2>
      {!!error && <div>{error}</div>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        style={{ outline: "none", padding: "0.5rem" }}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        style={{ outline: "none", padding: "0.5rem" }}
      />
      <button style={{ padding: "0.5rem 1rem" }} onClick={submitHandler}>
        Submit
      </button>

      <h4 onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {!isLoggedIn ? "Login" : "Register"}
      </h4>
    </div>
  );
};

export default Login;