import { Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Home from './components/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './views/Profile';

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </UserProvider>
    );
}

export default App;