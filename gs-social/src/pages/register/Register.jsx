import axios from "axios";
import { useRef } from "react";
import {Link, useNavigate} from 'react-router-dom';
import "./register.css";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };
      try {
        console.log("axios")
        await axiosInstance.post("auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">SIGN-UP</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on GS-Social.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="registerInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="registerInput"
              type="password"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="registerInput"
              type="password"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <Link to="/login" style={{textAlign: "center"}}><button className="registerRegisterButton">Log into Account</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
}
