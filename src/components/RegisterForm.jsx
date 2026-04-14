import useForm from '../hooks/formHooks';
import { useUser } from '../hooks/apiHooks'; // Tuodaan API-työkalut

const RegisterForm = ({ setToggleForm }) => {
    const { postUser } = useUser(); // Otetaan postUser-funktio käyttöön

    const doRegister = async (data) => {
        try {
            const registerResult = await postUser(data);
            console.log('Register success:', registerResult);
            setToggleForm(true);
        } catch (error) {
            console.error('Register error:', error.message);
        }
    };

    const initValues = { username: '', password: '', email: '' };

    const { handleInputChange, handleSubmit } = useForm(doRegister, initValues);

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="reguser">Username</label>
                    <input name="username" type="text" id="reguser" onChange={handleInputChange} autoComplete="username" />
                </div>
                <div>
                    <label htmlFor="regemail">Email</label>
                    <input name="email" type="email" id="regemail" onChange={handleInputChange} autoComplete="email" />
                </div>
                <div>
                    <label htmlFor="regpassword">Password</label>
                    <input name="password" type="password" id="regpassword" onChange={handleInputChange} autoComplete="new-password" />
                </div>
                <button type="submit">Register</button>
            </form>
        </>
    );
};

export default RegisterForm;