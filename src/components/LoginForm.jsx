import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/formHooks';
import { useAuthentication } from '../hooks/apiHooks';

const LoginForm = () => {
  const navigate = useNavigate();
  const { postLogin } = useAuthentication();

  const initValues = {
    username: '',
    password: '',
  };

  // Funktio ottaa vastaan 'data'-parametrin formHooks-tiedostolta
  const doLogin = async (data) => {
    try {
      console.log('Yritetään kirjautua...', data);
      
      const loginResult = await postLogin(data);
      
      if (loginResult && loginResult.token) {
        console.log('Kirjautuminen onnistui!');
        
        // Tallennetaan token selaimeen
        localStorage.setItem('token', loginResult.token);
        
        // Ohjataan käyttäjä etusivulle
        navigate('/');
      }
    } catch (error) {
      console.error('Kirjautumisvirhe:', error.message);
      alert('Kirjautuminen epäonnistui: ' + error.message);
    }
  };

  // Otetaan hook käyttöön
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