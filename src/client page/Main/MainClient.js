import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../../pages/Main/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGear } from "@fortawesome/free-solid-svg-icons";

function MainClient() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [fname, setFname] = useState(localStorage.getItem("fname"));
  const [urole, setUrole] = useState(localStorage.getItem("userrole"));
  const navigate = useNavigate();
  const inputRef = useRef(null);

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

              <div className="filterBut">
                <span>Filter</span>
              </div>
            </div>

            {accessToken ? (
              <>
                <div className="welcome-msg">
                  <p>Welcome! {fname}</p>
                </div>

                {urole === "admin" && (
                  <NavLink to="/main/movies" className="gearDash">
                    <FontAwesomeIcon icon={faGear} />
                  </NavLink>
                )}

                <li className="logout">
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </>
            ) : (
              <div className="logReg">
                <NavLink to="/login" className="login">
                  <span>Login</span>
                </NavLink>

                <div>Register</div>
              </div>
            )}
          </ul>
        </div>

        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainClient;
