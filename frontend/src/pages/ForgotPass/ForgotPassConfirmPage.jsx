import { useParams, Navigate } from "react-router";
import classes from "./ForgotPass.module.css";
import { useState, useRef, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { backendUrl } from "../../constant.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useAlert } from "../../store/context/Alert-context.js";
import LoginContext from "../../store/context/loginContext.js";

const ForgotPassConfirmPage = () => {
  const loginctx = useContext(LoginContext);
  const alertCtx = useAlert();
  const [cookies, setCookie] = useCookies(["AccessToken", "RefreshToken"]);
  const [isLoading, setIsLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const passwordref = useRef();
  const Confpasswordref = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  if (!id.includes('-') || id.split("-").length !== 3 || !id.includes('@')) {
    return <Navigate to={`/*?error=Not%20Authorised`} />;
  }
  const idw = id.split("-")[1];
  const code = id.split("-")[2];
  const proceedtoLogin = async (event) => {
    event.preventDefault();
    const passwordEntered = passwordref.current.value;
    const ConfpasswordEntered = Confpasswordref.current.value;
    if (
      passwordEntered.trim().length === 0 ||
      ConfpasswordEntered.trim().length === 0
    ) {
      setErrormsg("Please provide all the details");
      return;
    }
    if (passwordEntered !== ConfpasswordEntered) {
      setErrormsg("Passwords do not match");
      return;
    }
    if (passwordEntered.length < 8) {
      setErrormsg("Password must be at least 8 characters long");
      return;
    }
    const body = {
      password: passwordEntered,
    };
    try {
      setErrormsg("");
      setIsLoading(true);
      const resp = await axios.patch(
        `${backendUrl}/api/v1/users/resetpassword/${code}`,
        body,
        {
          timeout: 30000,
        }
      );
      setCookie("AccessToken", resp.data.AccessToken, { path: "/", maxAge: 60 * 60 * 24 * 1 * 0.2 });
      setCookie("RefreshToken", resp.data.RefreshToken, { path: "/", maxAge: 60 * 60 * 24 * 1 * 0.6 });
      loginctx.login(resp.data.AccessToken, resp.data.RefreshToken, resp.data.name);
      if (resp.data.status === "success") {
        localStorage.removeItem("Passcode");
        localStorage.removeItem("Passcode2");
        alertCtx.showAlert('success', 'Password changed successfully');
      }
      navigate(`/login`);
      console.log(resp);
    } catch (error) {
      console.log(error);
      if (error.response?.data?.message) {
        setErrormsg(error.response.data.message);
        return;
      }
      setErrormsg("Something went wrong. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = localStorage.getItem("Passcode2");
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
    <>
      <div className={`row d-flex align-items-center ${classes.container}`}>
        {!isValid && (
          <p className="h1 d-flex align-items-center justify-content-center">
            Not Authorised
          </p>
        )}
        <AnimatePresence>
          {isValid === "1" && (
            <motion.form className={`border-bottom-0 ${classes.form}`}>
              {!isLoading && <p className={classes.loading}> {errormsg}</p>}

              <motion.div
                variants={animateVariants}
                animate="show"
                exit="exit"
                className={classes.box}
              ></motion.div>
              <p className="h2" >Forgot Password</p>
              <p>Enter new Password for {idw}</p>
              <div className="input-group mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={!showPassword ? " · · · · · · · ·  " : "New-Password"}
                  className="form-control shadow-none"
                  id="code"
                  autoComplete="on"
                  ref={passwordref}
                  pattern=".{8,}"
                  title="Password must be at least 8 characters long"
                  required
                />
                <span
                  className="input-group-text"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                </span>
              </div>
              <div className="input-group mb-3">
                <input
                  type={showPassword2 ? "text" : "password"}
                  placeholder={
                    !showPassword2 ? " · · · · · · · ·  " : "Confirm-Password"
                  }
                  className="form-control shadow-none"
                  id="code2"
                  ref={Confpasswordref}
                  pattern=".{8,}"
                  title="Password must be at least 8 characters long"
                  required
                />
                <span
                  className="input-group-text"
                  onClick={() => {
                    setShowPassword2(!showPassword2);
                  }}
                >
                  {showPassword2 ? <RiEyeOffFill /> : <RiEyeFill />}
                </span>
              </div>

              <div className={classes.buttons}>
                <button
                  className="btn btn-primary w-100"
                  type="submit"
                  onClick={proceedtoLogin}
                  disabled={isLoading}
                >
                  {!isLoading && "Confirm Password"}
                  {isLoading && (
                    <div className="spinner-border text-danger" role="status">
                    </div>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default ForgotPassConfirmPage;
