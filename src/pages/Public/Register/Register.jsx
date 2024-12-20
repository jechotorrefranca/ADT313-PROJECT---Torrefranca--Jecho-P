import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Register.css";
import axios from "axios";
import { useDebounce } from "../../../utils/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";

function Register({ handleClose, handleGoLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const fNameref = useRef();
  const mNameRef = useRef();
  const lNameref = useRef();
  const CNoRef = useRef();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const [debounceState, setDebounceState] = useState(true);
  const [status, setStatus] = useState("idle");
  const userInputDebounce = useDebounce(
    { email, password, firstName, middleName, lastName, contactNo },
    2000
  );

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

      case "firstName":
        setFirstName(event.target.value);
        break;

      case "lastName":
        setLastName(event.target.value);
        break;

      case "middleName":
        setMiddleName(event.target.value);
        break;

      case "contactNo":
        setContactNo(event.target.value);
        break;

      default:
        break;
    }
  };

  const checkFields = () => {
    if (email && password && firstName && middleName && lastName && contactNo) {
      handleRegister();
    } else {
      setIsFieldsDirty(true);

      if (email === "") {
        emailRef.current.focus();
      } else if (password === "") {
        passwordRef.current.focus();
      } else if (firstName === "") {
        fNameref.current.focus();
      } else if (middleName === "") {
        mNameRef.current.focus();
      } else if (lastName === "") {
        lNameref.current.focus();
      } else if (contactNo === "") {
        CNoRef.current.focus();
      }
    }
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setContactNo("");
    setIsFieldsDirty(false);
  };

  const handleRegister = async () => {
    const data = {
      email,
      password,
      firstName,
      middleName,
      lastName,
      contactNo,
    };
    setStatus("loading");
    console.log(data);

    await axios({
      method: "post",
      url: "/registerUser.php",
      data,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((res) => {
        console.log(res);
        alert("Registration successful!");
        navigate("/");
        resetInputs();
        setStatus("idle");
      })
      .catch((e) => {
        console.log(e);
        const errorMessage = e.response?.data?.message || "An error occurred";
        alert("Registration failed: " + errorMessage);
        setStatus("idle");
      });
  };

  // --------------- COULD BE SIMPLIFIED AS ---------------

  // const handleRegister = async () => {

  //   const data = { email, password, firstName, middleName, lastName, contactNo };
  //   console.log(data);  // Check data before sending the request

  //   try {
  //     const res = await axios.post('/admin/register', data);
  //     console.log(res);
  //     alert('Registration successful!');
  //     resetInputs();
  //     setStatus('idle');
  //   } catch (e) {
  //     console.log(e);
  //     const errorMessage = e.response?.data?.message || 'An error occurred';
  //     alert('Registration failed: ' + errorMessage);
  //     setStatus('idle');
  //   }
  // };

  // --------------- COULD BE SIMPLIFIED AS ---------------

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className="formCont">
      <div className="wholee">
        <div className="exitIcon">
          <FontAwesomeIcon icon={faTimes} onClick={handleClose} />
        </div>
        <div className="formDiv">
          <p className="registerText">Register</p>
          <form>
            <div className="inputCont">
              <div className="inputs">
                <label>E-mail:</label>
                <input
                  className="formDivInp"
                  type="text"
                  value={email}
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, "email")}
                />
              </div>

              {debounceState && isFieldsDirty && email === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="inputCont">
              <div className="inputs">
                <label>Password:</label>
                <div className="passwordCont">
                  <input
                    className="passwordInput"
                    type={isShowPassword ? "text" : "password"}
                    value={password}
                    ref={passwordRef}
                    onChange={(e) => handleOnChange(e, "password")}
                  />
                  {isShowPassword ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="passEye"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="passEye"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </div>

              {debounceState && isFieldsDirty && password === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="inputCont">
              <div className="inputs">
                <label>First Name:</label>
                <input
                  className="formDivInp"
                  type="text"
                  value={firstName}
                  ref={fNameref}
                  onChange={(e) => handleOnChange(e, "firstName")}
                />
              </div>

              {debounceState && isFieldsDirty && firstName === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="inputCont">
              <div className="inputs">
                <label>Middle Name:</label>
                <input
                  className="formDivInp"
                  type="text"
                  value={middleName}
                  ref={mNameRef}
                  onChange={(e) => handleOnChange(e, "middleName")}
                />
              </div>

              {debounceState && isFieldsDirty && middleName === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="inputCont">
              <div className="inputs">
                <label>Last Name:</label>
                <input
                  className="formDivInp"
                  type="text"
                  value={lastName}
                  ref={lNameref}
                  onChange={(e) => handleOnChange(e, "lastName")}
                />
              </div>

              {debounceState && isFieldsDirty && lastName === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <div className="inputCont">
              <div className="inputs">
                <label>Contact No:</label>
                <input
                  className="formDivInp"
                  type="text"
                  value={contactNo}
                  ref={CNoRef}
                  onChange={(e) => handleOnChange(e, "contactNo")}
                />
              </div>

              {debounceState && isFieldsDirty && contactNo === "" && (
                <span className="errors">This field is required</span>
              )}
            </div>

            <button
              type="button"
              disabled={status === "loading"}
              onClick={checkFields}
              className="regButton"
            >
              {status === "idle" ? "Register" : "Registering"}
            </button>
          </form>

          <div className="alrAcc">
            <p onClick={handleGoLogin}>
              <small className="alrAccPoint">I already have an account</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
