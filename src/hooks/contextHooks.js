import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';

// Tämä hook on helpompi ja turvallisempi tapa käyttää UserContextia
const useUserContext = () => {
    const context = useContext(UserContext);
    
    // Jos context on null, se tarkoittaa että UserProvider puuttuu App.jsx:stä
    if (!context) {
        throw new Error('useUserContext must be used within an UserProvider');
    }

    return context;
};

export {useUserContext};