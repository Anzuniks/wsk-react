import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useUserContext } from '../hooks/contextHooks';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  useEffect(() => {
    // Tarkistetaan käyttäjän tila heti kun sovellus latautuu
    handleAutoLogin();
  }, [handleAutoLogin]);

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          
          {/* Jos käyttäjä ON kirjautunut, näytetään nämä */}
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
              <li><Link to="/upload">Upload</Link></li>
            </>
          ) : (
            /* Jos käyttäjä EI OLE kirjautunut, näytetään nämä */
            <>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>
      
      <main>
        {/* Outlet renderöi sen sivun, jolla kulloinkin ollaan (Home, Login jne.) */}
        <Outlet />
      </main>
      
      <footer>
        <p>&copy; 2026 Media App</p>
      </footer>
    </div>
  );
};

export default Layout;