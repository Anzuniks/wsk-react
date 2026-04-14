import { createContext, useState } from 'react';
import { useAuthentication, useUser } from '../hooks/apiHooks';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { postLogin } = useAuthentication();
    const { getUserByToken } = useUser();
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const loginResult = await postLogin(credentials);
            localStorage.setItem('token', loginResult.token);
            setUser(loginResult.user);
            navigate('/');
        } catch (e) {
            console.log('Login failed:', e.message);
            throw e;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const handleAutoLogin = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userResult = await getUserByToken(token);
                setUser(userResult.user);
            }
        } catch (e) {
            console.log('Auto-login failed:', e.message);
            localStorage.removeItem('token');
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, handleLogin, handleLogout, handleAutoLogin }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };