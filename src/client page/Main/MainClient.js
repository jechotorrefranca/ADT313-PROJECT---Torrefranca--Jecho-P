import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../../pages/Main/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGear } from "@fortawesome/free-solid-svg-icons";
import Login from "../../pages/Public/Login/Login";
import Register from "../../pages/Public/Register/Register";
import { useAnimeContext } from "../../context/AnimeContext";

function MainClient() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [fname, setFname] = useState(localStorage.getItem("fname"));
  const [urole, setUrole] = useState(localStorage.getItem("userrole"));
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { onlyAnime } = useAnimeContext();

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fname");
    localStorage.removeItem("userrole");

    setAccessToken(null);
    navigate("/");
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
    setFname(localStorage.getItem("fname"));
    setUrole(localStorage.getItem("userrole"));

    const handleSavedChange = () => {
      setAccessToken(localStorage.getItem("accessToken"));
      setFname(localStorage.getItem("fname"));
      setUrole(localStorage.getItem("userrole"));
    };

    window.addEventListener("storage", handleSavedChange);
    return () => {
      window.removeEventListener("storage", handleSavedChange);
    };
  }, []);

  const handleShowLogin = () => {
    setShowLogin((prev) => !prev);
  };

  const handleCLoseRegister = () => {
    setShowRegister((prev) => !prev);
  };

  const handleShowRegister = () => {
    setShowLogin((prev) => !prev);
    setShowRegister((prev) => !prev);
  };

  return (
    <div className="Main">
      <div className="container">
        <div className="navigation">
          <ul>
            <div className="leftNav">
              <div className="navLogo">
                <NavLink to="/">AniKou</NavLink>
              </div>

              <div className="searchCont" onClick={handleDivClick}>
                <FontAwesomeIcon icon={faSearch} />
                <input
                  placeholder="Search TV Shows or Movies"
                  type="text"
                  className="searchBox"
                  ref={inputRef}
                />
              </div>
            </div>

            {accessToken ? (
              <div className="rightNav">
                <div className="welcome-msg">
                  <div className="welName">
                    <p>Welcome! {fname}</p>
                  </div>

                  <div>
                    {urole === "admin" && (
                      <NavLink to="/main/movies" className="gearDash">
                        <FontAwesomeIcon icon={faGear} />
                      </NavLink>
                    )}
                  </div>

                  <div>
                    <img
                      src={"https://via.placeholder.com/50"}
                      alt="User"
                      className="pfpContainer"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="logReg">
                <div to="/login" className="login" onClick={handleShowLogin}>
                  <span>Login</span>
                </div>
              </div>
            )}
          </ul>
        </div>

        {showLogin && (
          <Login
            handleClose={handleShowLogin}
            handleShowRegister={handleShowRegister}
          />
        )}
        {showRegister && (
          <Register
            handleClose={handleCLoseRegister}
            handleGoLogin={handleShowRegister}
          />
        )}

        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainClient;
