import { Route, Routes, HashRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Home from './components/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './views/Profile';
import Upload from './views/Upload';

function App() {
    return (
        <HashRouter>
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
                        <Route
                            path="/upload"
                            element={
                                <ProtectedRoute>
                                    <Upload />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </UserProvider>
        </HashRouter>
    );
}

export default App;