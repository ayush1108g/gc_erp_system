import classes from "./LoginPage.module.css";
import axios from "axios";
import LoginContext from "../store/context/loginContext.js";
import { useNavigate } from "react-router";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { backendUrl } from "../constant.js";
import { useCookies } from "react-cookie";
import { useAlert } from "../store/context/Alert-context.js";

const Login = (props) => {
  const alertCtx = useAlert();
  const [cookies, setCookie] = useCookies(["AccessToken", "RefreshToken"]);
  const navigate = useNavigate();
  const [errormsg, setErrormsg] = useState("   ");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const loginCtx = useContext(LoginContext);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const loginpageHandler = () => {
    navigate("/signup");
  };
  const forgotPasswordHandler = () => {
    navigate("forgotpassword");
  };
  if (loginCtx.isLoggedIn) {
    navigate("/");
  }



  const LoginHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (enteredEmail.trim().length === 0 || enteredPassword.trim().length === 0)
      return setErrormsg("Please enter all the fields");
    const data = {
      email: enteredEmail,
      password: enteredPassword,
    };
    console.log(data);

    try {
      setIsLoading(true);
      let resp;
      resp = await axios.post(`${backendUrl}/api/v1/users/login`, data,
        { withCredentials: true },
        { timeout: 30000, });
      console.log(resp);

      if (resp.status === 201 || resp.status === 200) {
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";
        console.log(resp.data.data.user.name);

        setCookie("AccessToken", resp.data.AccessToken, { path: "/", maxAge: 60 * 60 * 24 * 1 * 0.2 });
        setCookie("RefreshToken", resp.data.RefreshToken, { path: "/", maxAge: 60 * 60 * 24 * 30 * 0.6 });

        loginCtx.login(resp.data.AccessToken, resp.data.RefreshToken, resp.data.data.user.personal_info.name,resp.data.data.user.role);
        setErrormsg("Success");
        // setTimeout(() => {
        // }, 1000);
        alertCtx.showAlert("success", "Logged In Successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) setErrormsg(error.response.data.message);
      else if (error.code === "ERR_BAD_REQUEST") setErrormsg("Email already in use");
      else if (error.code === "ERR_BAD_RESPONSE")
        setErrormsg("Server Not Responding...");
      else setErrormsg("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };
  const animateVariants = {
    show: {
      scale: [15, 0],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.5,
      },
    },
    hide: {
      scale: 0,
    },
    exit: {
      scale: [0, 15],
      transition: {
        times: [0, 1],
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  return (
    <div style={{
      // width: '100vw',
      // height: '100vh',
    }}>
      <div className={`row d-flex align-items-center ${classes.container}`}>
        <motion.form
          key={loginCtx.isLoggedIn}
          className={`border-bottom-0 ${classes.form}`}
        >
          {!isLoading && <p className={classes.loading}> {errormsg}</p>}
          {isLoading && <p className={classes.loading}>&nbsp; </p>}
          <motion.div
            variants={animateVariants}
            animate="show"
            exit="exit"
            className={classes.box}
          ></motion.div>

          <div className="input-group mb-3">
            <input
              className="form-control shadow-none "
              type="email"
              id="email"
              autoComplete="on"
              placeholder="email-id"
              ref={emailInputRef}
              title="Please enter a valid email address in the format user@example.com"
              required
            />
          </div>



          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control shadow-none "
              placeholder={!showPassword ? " · · · · · · · · " : "password"}
              ref={passwordInputRef}
              pattern=".{8,}"
              title="Password must be at least 8 characters long"
              required
            />
            <span className="input-group-text" onClick={handleTogglePassword}>
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </span>
          </div>

          <div className={classes.buttons}>
            <button
              className="btn btn-primary w-100"
              type="submit"
              onClick={LoginHandler}
              style={{
                height: isLoading ? "" : "50px"
              }}
            >
              {isLoading && (
                <div className="spinner-border text-danger" role="status">
                </div>
              )}
              {!isLoading && "Login"}
            </button>
          </div>
          <div className={classes.pagechange}>
            <b>
              <p
                onClick={loginpageHandler}
                className={"small font-monospace text-center row text-dark " + classes.signin}
              >
                {"Don't have an account? Sign Up"}
              </p>
              <motion.p
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className={"small d-flex justify-content-end font-monospace row text-dark " + classes.signin}
                style={{ fontSize: "2vh" }}
                onClick={forgotPasswordHandler}
              >
                Forgot Password?
              </motion.p>
            </b>
          </div>
        </motion.form>
      </div >
    </div >
  );
};
export default Login;
