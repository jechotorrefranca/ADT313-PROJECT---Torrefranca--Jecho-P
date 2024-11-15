import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../../pages/Main/Main.css';

function MainClient() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
    // window.location.reload(); // Refreshes the page to reflect the logout state
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    }
  }, [accessToken]); // Add accessToken as a dependency

  return (
    <div className='Main'>
      <div className='container'>
        <div className='navigation'>
          <ul>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Movies
              </NavLink>
            </li>
            {accessToken ? (
              <li className='logout'>
                <a onClick={handleLogout}>Logout</a>
              </li>
            ) : (
              <li className='login'>
                <NavLink
                  to='/login'
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainClient;
