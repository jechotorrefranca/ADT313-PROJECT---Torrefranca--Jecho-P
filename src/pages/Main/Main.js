import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Main() {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    }
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
            </div>

            {accessToken ? (
              <li className="logout">
                <a onClick={handleLogout}>Logout</a>
              </li>
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

export default Main;
