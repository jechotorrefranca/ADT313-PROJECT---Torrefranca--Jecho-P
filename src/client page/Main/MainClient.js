import { useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../../pages/Main/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function MainClient() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const inputRef = useRef(null);

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    }
  }, [accessToken]);

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
              <li className="logout">
                <a onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <div className="logReg">
                
                <NavLink to="/login" className="login">
                  <span >Login</span>
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
