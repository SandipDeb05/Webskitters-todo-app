import { useAuth } from "@/context/authContext";
import { useState } from "react";
import GoogleButton from "react-google-button";

const Login = () => {
  const { login, signup, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const submitHandler = async () => {
    if (!email || !password) {
      setError("All fields are requide");
      return;
    }

    if (password?.length < 8) {
      setError("Password must be 8 characters long");
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
      } catch (error: any) {
        if (error.code === 400) {
          setError("Email and password already in use");
        } else {
          setError("Something went wrong");
        }
      }
    }
  };

  const loginWithGoogleHandler = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div>
        <h2>{isLoggedIn ? "Login" : "Register"}</h2>
      </div>

      {!!error && <div className="error-message">{error}</div>}
      <div className="input-field">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="input-field"
        />
      </div>

      <div className="input-field">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </div>

      <div>
        <button className="submit-button" onClick={submitHandler}>
          Submit
        </button>
      </div>

      <div className="google-button">
        <GoogleButton type="light" onClick={loginWithGoogleHandler} />
      </div>

      <div>
        <button
          className="toggle-button"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
        >
          {!isLoggedIn ? "Login" : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Login;
