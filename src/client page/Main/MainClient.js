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
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null); // Add a ref for the search box
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { onlyAnime } = useAnimeContext();

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setShowSearchBox(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fname");
    localStorage.removeItem("userrole");

    setAccessToken(null);
    navigate("/");
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const filteredAnime =
    Array.isArray(onlyAnime) && searchText.trim() !== ""
      ? onlyAnime.filter((item) =>
          item.anime?.name?.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target) &&
        inputRef.current !== event.target
      ) {
        setShowSearchBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setShowSearchBox(true)}
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

                  <div className="abso">
                    <img
                      src={"https://via.placeholder.com/50"}
                      alt="User"
                      className="pfpContainer"
                      onClick={toggleModal}
                    />
                    {showModal && (
                      <div className="modall" onClick={handleLogout}>
                        Logout
                      </div>
                    )}
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

        {showSearchBox && (
          <div className="searchRem" ref={searchBoxRef}>
            <div className="absolute-search-box">
              {searchText.trim() === "" ? (
                <div className="typetextCont">
                  <p>Type to search for your favorite anime</p>
                </div>
              ) : filteredAnime.length > 0 ? (
                <div className="filteredCont">
                  {filteredAnime.map((item) => (
                    <div
                      className="filteredAnime"
                      key={item.anime.id}
                      onMouseDown={() => navigate(`/view/${item.anime.id}`)} // Prevent blur before navigation
                    >
                      <img
                        src={item.anime.poster_path}
                        alt={item.anime.name}
                        className="animePosterCardImgg"
                      />
                      <div className="imageTextSearch">
                        <div className="searchedName">{item.anime.name}</div>
                        <div className="searchedOverview">
                          {item.anime.overview
                            .split(" ")
                            .slice(0, 40)
                            .join(" ")
                            .concat("...")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="typetextCont">
                  <p>No results found</p>
                </div>
              )}
            </div>
          </div>
        )}

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
