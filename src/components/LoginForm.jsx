import useForm from '../hooks/formHooks';
import { useUserContext } from '../hooks/contextHooks'; // Tuodaan uusi hook

const LoginForm = () => {
  // Napataan handleLogin-funktio Contextista
  const { handleLogin } = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async (data) => {
    try {
      // Kutsutaan Contextin handleLoginia. 
      // Se hoitaa: postLoginin, tokenin tallennuksen, user-staten ja navigoinnin!
      await handleLogin(data);
      console.log('Kirjautuminen onnistui Contextin kautta');
    } catch (error) {
      console.error('Kirjautumisvirhe:', error.message);
      alert('Kirjautuminen epäonnistui: ' + error.message);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(doLogin, initValues);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
            value={inputs.username}
          />
        </div>

        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            value={inputs.password}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;