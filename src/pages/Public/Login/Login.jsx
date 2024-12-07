import { useState, useRef, useCallback, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../../utils/hooks/useDebounce";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState("idle");

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);

    switch (type) {
      case "email":
        setEmail(event.target.value);

        break;

      case "password":
        setPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  const handleLogin = async () => {
    const data = { email, password };
    setStatus("loading");
    try {
      const response = await axios({
        method: "post",
        url: "/loginUser.php",
        data,
        headers: { "Access-Control-Allow-Origin": "*" },
      });

      console.log(response);

      if (response.data.success) {
        const { user } = response.data;

        console.log(user);

        localStorage.setItem("accessToken", user.access_token);
        localStorage.setItem("userId", user.user_id);
        localStorage.setItem("contactnumber", user.contact_number);
        localStorage.setItem("fname", user.first_name);
        localStorage.setItem("lname", user.last_name);
        localStorage.setItem("mname", user.middle_name);
        localStorage.setItem("userrole", user.user_role);

        if (user.user_role === "admin") {
          console.log("Admin login successful");
          navigate("/main/movies");
        } else if (user.user_role === "user") {
          console.log("user recognized");
          navigate("/");
        } else {
          alert("User not recognized, Check your username and password");
        }
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      console.error("Login failed", e);
      alert(e.response?.data?.error || "An error occurred during login");
    } finally {
      setStatus("idle");
    }
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className="Login">
      <div className="main-container">
        <h3>Login</h3>
        <form>
          <div className="form-container">
            <div>
              <div className="form-group">
                <label>E-mail:</label>
                <input
                  type="text"
                  name="email"
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, "email")}
                />
              </div>
              {debounceState && isFieldsDirty && email == "" && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type={isShowPassword ? "text" : "password"}
                  name="password"
                  ref={passwordRef}
                  onChange={(e) => handleOnChange(e, "password")}
                />
              </div>
              {debounceState && isFieldsDirty && password == "" && (
                <span className="errors">This field is required</span>
              )}
            </div>
            <div className="show-password" onClick={handleShowPassword}>
              {isShowPassword ? "Hide" : "Show"} Password
            </div>

            <div className="submit-container">
              <button
                type="button"
                disabled={status === "loading"}
                onClick={() => {
                  if (status === "loading") {
                    return;
                  }
                  if (email && password) {
                    handleLogin({
                      type: "login",
                      user: { email, password },
                    });
                  } else {
                    setIsFieldsDirty(true);
                    if (email == "") {
                      emailRef.current.focus();
                    }

                    if (password == "") {
                      passwordRef.current.focus();
                    }
                  }
                }}
              >
                {status === "idle" ? "Login" : "Loading"}
              </button>
            </div>
            <div className="register-container">
              <a href="/register">
                <small>Register</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
