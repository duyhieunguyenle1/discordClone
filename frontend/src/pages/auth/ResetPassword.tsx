import AuthBox from '../../components/AuthBox/AuthBox';
import ResetPassword from '../../modules/Auth/Verify/ForgotPassword/ResetPassword';

const ResetPasswordPage = () => {
  return (
    <AuthBox>
      <ResetPassword />
    </AuthBox>
  );
};

export default ResetPasswordPage;
