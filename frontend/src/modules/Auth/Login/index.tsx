import RedirectLabel from '../../../components/Redirect/RedirectLabel';
import { PATH_HOME_REGISTER } from '../../../routes/router.path';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <>
      <LoginForm />
      <RedirectLabel
        label="Need an account?"
        redirectText="Create an account"
        classNames={{
          marginTop: '1rem',
        }}
        redirectRoute={PATH_HOME_REGISTER}
      />
    </>
  );
};

export default Login;
