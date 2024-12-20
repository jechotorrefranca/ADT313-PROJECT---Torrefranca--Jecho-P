import { useEffect, useRef, useReducer } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../../pages/Main/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGear } from "@fortawesome/free-solid-svg-icons";
import Login from "../../pages/Public/Login/Login";
import Register from "../../pages/Public/Register/Register";
import { useAnimeContext } from "../../context/AnimeContext";

// Define the initial state
const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  fname: localStorage.getItem("fname"),
  urole: localStorage.getItem("userrole"),
  showModal: false,
  searchText: "",
  showSearchBox: false,
  showLogin: false,
  showRegister: false,
};

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "set_access_token":
      return { ...state, accessToken: action.payload };
    case "set_fname":
      return { ...state, fname: action.payload };
    case "set_user_role":
      return { ...state, urole: action.payload };
    case "toggle_modal":
      return { ...state, showModal: !state.showModal };
    case "set_search_text":
      return { ...state, searchText: action.payload };
    case "toggle_searchbox":
      return { ...state, showSearchBox: action.payload };
    case "toggle_login":
      return { ...state, showLogin: !state.showLogin };
    case "toggle_register":
      return { ...state, showRegister: !state.showRegister };
    default:
      return state;
  }
};

function MainClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    accessToken,
    fname,
    urole,
    showModal,
    searchText,
    showSearchBox,
    showLogin,
    showRegister,
  } = state;

  const { onlyAnime, userData } = useAnimeContext();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      dispatch({ type: "toggle_searchbox", payload: true });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fname");
    localStorage.removeItem("userrole");

    dispatch({ type: "set_access_token", payload: null });
    navigate("/");
  };

  const toggleModal = () => {
    dispatch({ type: "toggle_modal" });
  };

  const filteredAnime =
    Array.isArray(onlyAnime) && searchText.trim() !== ""
      ? onlyAnime.filter((item) =>
          item.anime?.name?.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

  useEffect(() => {
    const handleSavedChange = () => {
      dispatch({
        type: "set_access_token",
        payload: localStorage.getItem("accessToken"),
      });
      dispatch({ type: "set_fname", payload: localStorage.getItem("fname") });
      dispatch({
        type: "set_user_role",
        payload: localStorage.getItem("userrole"),
      });
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
        dispatch({ type: "toggle_searchbox", payload: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowLogin = () => {
    dispatch({ type: "toggle_login" });
  };

  const handleCLoseRegister = () => {
    dispatch({ type: "toggle_register" });
  };

  const handleShowRegister = () => {
    dispatch({ type: "toggle_login" });
    dispatch({ type: "toggle_register" });
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
                  onChange={(e) =>
                    dispatch({
                      type: "set_search_text",
                      payload: e.target.value,
                    })
                  }
                  onFocus={() =>
                    dispatch({ type: "toggle_searchbox", payload: true })
                  }
                />
              </div>
            </div>

            {accessToken ? (
              <div className="rightNav">
                <div className="welcome-msg">
                  <div className="welName">
                    <p>Welcome! {userData.firstName}</p>
                  </div>

                  <div>
                    {userData.userRole === "admin" && (
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
                      onMouseDown={() => navigate(`/view/${item.anime.id}`)}
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
