import { useEffect } from 'react';
import { useUserContext } from '../hooks/contextHooks';

const Logout = () => {
  const { handleLogout } = useUserContext();

  useEffect(() => {
    // Kutsutaan Contextin handleLogout-funktiota heti kun sivu latautuu
    handleLogout();
  }, [handleLogout]);

  return (
    <div>
      <p>Kirjaudutaan ulos...</p>
    </div>
  );
};

export default Logout;