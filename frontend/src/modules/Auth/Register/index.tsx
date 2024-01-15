import RegisterForm from './RegisterForm';
import RedirectLabel from '../../../components/Redirect/RedirectLabel';
import { PATH_HOME_LOGIN } from '../../../routes/router.path';

const index = () => {
  return (
    <>
      <RegisterForm />
      <RedirectLabel
        label=""
        redirectText="Already have an account?"
        classNames={{
          marginTop: '1rem',
        }}
        redirectRoute={PATH_HOME_LOGIN}
      />
    </>
  );
};

export default index;
