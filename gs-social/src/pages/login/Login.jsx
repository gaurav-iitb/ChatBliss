import { useRef } from "react";
import "./login.css";
import { loginCall } from "../../apicalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user,isFetching,error,dispatch}= useContext(AuthContext)
  function handleSubmit(e){
    e.preventDefault();  
    loginCall({email: email.current.value,password: password.current.value},dispatch)
  }
  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginTop">
          <h3 className="loginLogo">LOGIN</h3>
          <span className="logindesc">
            Connect with friends and the world around you on GS-Social.
          </span>
        </div>
        <div className="loginBottom">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Email" required type="email" className="loginInput" ref={email}/>
            <input placeholder="Password" required type="password" className="loginInput" ref={password} />  
            <button className="loginButton" disabled={isFetching}>{isFetching?<CircularProgress color="inherit" />:"Log In"}</button>
            {/* <span className="loginForgot">Forgot Password?</span> */}
            <Link to="/register" style={{textAlign: "center"}}><button className="registerRegisterButton">Create a New Account</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
}
