import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
    const [toggleForm, setToggleForm] = useState(true);

    return (
        <>
            {/* Välitetään setToggleForm propsina RegisterFormille */}
            {toggleForm ? (
                <LoginForm />
            ) : (
                <RegisterForm setToggleForm={setToggleForm} />
            )}
            
            <button onClick={() => setToggleForm(!toggleForm)}>
                {toggleForm ? 'No account yet? Register here.' : 'Already have an account? Login here.'}
            </button>
        </>
    );
};

export default Login;