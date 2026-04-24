import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useUserContext } from '../hooks/contextHooks';

const Layout = () => {
  const { user, handleAutoLogin } = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, [handleAutoLogin]);

  return (
    /* flex-grow varmistaa, että main-osio täyttää tilan ja footer pysyy alhaalla */
    <div className="flex flex-col min-h-screen">
      <nav className="border-b border-[var(--border)] py-4">
        {/* flex: asettaa linkit riviin 
          justify-center: keskittää linkit
          gap-6: lisää väliä linkkien välille
          *:no-underline: poistaa alleviivauksen kaikilta lapsilta
          hover:*:text-[var(--accent)]: vaihtaa värin kun hiiri on linkin päällä
        */}
        <ul className="flex justify-center gap-10 list-none p-0 m-0 font-medium
                       *:text-[var(--text)] *:transition-colors *:duration-200
                       hover:*:text-[var(--accent)] *:no-underline">
          <li>
            <Link to="/">Home</Link>
          </li>
          
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/upload">Upload</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
      
      <main className="flex-grow p-8">
        <Outlet />
      </main>
      
      <footer className="border-t border-[var(--border)] py-6 text-sm opacity-60">
        <p>&copy; 2026 Media App</p>
      </footer>
    </div>
  );
};

export default Layout;