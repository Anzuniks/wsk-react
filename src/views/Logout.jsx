import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Poistetaan token selaimen muistista
        localStorage.removeItem('token'); 
        // Ohjataan käyttäjä heti takaisin etusivulle
        navigate('/'); 
    }, [navigate]);

    return null; // Tämä komponentti ei piirrä mitään käyttöliittymää
};

export default Logout;