import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { PATH_HOME_LOGIN } from '../../../../routes/router.path';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import handleAxiosError from '../../../../utils/handleAxiosError';
import authApi from '../../../../services/auth.services';
import { Tooltip, Typography } from '@mui/material';
import InputLabel from '../../../../components/InputLabel/InputLabel';
import PrimaryButton from '../../../../components/Button/PrimaryButton';
import storage from '../../../../utils/storage';

const ResetPassword = () => {
  const [searchParams] = useSearchParams('');
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = data => {
    authApi
      .resetPassword(data, searchParams.get('token')!, searchParams.get('e')!)
      .then(res => {
        if (res.status === 200) {
          storage.setAccessToken(res.data.accessToken);
          navigate(0);
        }
      })
      .catch(err => handleAxiosError(err));
  };

  useEffect(() => {
    if (errors['password']?.message || errors['confirmPassword']?.message) setIsSubmitting(true);
    else {
      setIsSubmitting(false);
      if (getValues('password') !== getValues('confirmPassword'))
        setError('confirmPassword', { message: 'Confirm password must be equals to password' });
    }
  }, [errors['password']?.message, errors['confirmPassword']?.message]);

  useEffect(() => {
    if (!searchParams.get('e') || !searchParams.get('token')) {
      navigate(PATH_HOME_LOGIN);
    }
  }, []);

  return (
    <>
      <form className="relative" onSubmit={handleSubmit(onSubmitHandler)}>
        <Link className="absolute" to={PATH_HOME_LOGIN}>
          <ArrowBackIcon
            style={{ color: 'white' }}
            className="transition-all duration-500 hover:opacity-70"
          />
        </Link>
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '500',
            marginBottom: '1rem',
            marginTop: '1.35rem',
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            textAlign: 'center',
            fontSize: '.85rem',
            fontWeight: '300',
            marginBottom: '.5rem',
          }}
        >
          Enter the email address associated with your account and <br />
          we'll send you a link to reset your password.
        </Typography>
        <InputLabel
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password here"
          errors={errors}
          register={register}
          minLength={6}
        />
        <InputLabel
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password here"
          errors={errors}
          register={register}
          minLength={6}
        />
        <Tooltip
          title={!isSubmitting ? 'Press to reset password' : 'Please enter correct password types'}
        >
          <div>
            <PrimaryButton
              type="submit"
              label="Reset Password"
              disabled={isSubmitting}
              classNames={{ marginTop: '32px' }}
            />
          </div>
        </Tooltip>
      </form>
    </>
  );
};

export default ResetPassword;
