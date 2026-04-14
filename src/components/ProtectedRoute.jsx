import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/contextHooks';

const ProtectedRoute = ({ children }) => {
    const { user } = useUserContext();

    // Jos käyttäjää ei löydy Contextista, ohjataan hänet etusivulle
    if (!user) {
        return <Navigate to="/" />;
    }

    // Jos käyttäjä on kirjautunut, näytetään se sivu minne hän oli menossa
    return children;
};

export default ProtectedRoute;