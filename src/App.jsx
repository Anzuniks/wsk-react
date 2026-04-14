import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './views/Login';
import Logout from './views/Logout';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    );
}

export default App;