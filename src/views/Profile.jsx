import { useEffect, useState } from 'react';
import { useUser } from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { getUserByToken } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1. Haetaan token selaimen muistista
        const token = localStorage.getItem('token');
        
        if (token) {
          // 2. Kutsutaan hookia, joka hakee tiedot rajapinnasta
          const userData = await getUserByToken(token);
          console.log('Käyttäjätiedot haettu:', userData);
          
          // 3. Tallennetaan käyttäjä tilaan (huom: rajapinta palauttaa yleensä { user: { ... } })
          setUser(userData.user || userData); 
        }
      } catch (error) {
        console.error('Virhe profiilitietojen haussa:', error.message);
      }
    };

    fetchUser();
  }, [getUserByToken]);

  return (
    <>
      <h1>Profile</h1>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.user_id}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </>
  );
};

export default Profile;