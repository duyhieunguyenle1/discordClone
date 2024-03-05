import { Typography, Tooltip } from '@mui/material';
import InputLabel from '../../../components/InputLabel/InputLabel';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import { useEffect, useState } from 'react';
import authApi from '../../../services/auth.services';
import handleAxiosError from '../../../utils/handleAxiosError';
import storage from '../../../utils/storage';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { PATH_HOME_VERIFY_EMAIL } from '../../../routes/router.path';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const regExpEmail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = data => {
    authApi
      .login(data)
      .then(res => {
        if (res.status === 200) {
          storage.setAccessToken(res.data.accessToken);
          navigate(0);
        }
      })
      .catch(err => {
        if (isAxiosError(err)) {
          if (err.response?.status === 406) {
            navigate(`${PATH_HOME_VERIFY_EMAIL}?e=${data?.email}`);
            authApi
              .sendOtp('', data.email)
              .then(res => {
                if (res.status === 200) {
                  toast.error('Please confirm your email to continue');
                }
              })
              .catch(err2 => handleAxiosError(err2));
          }
        }
        handleAxiosError(err);
      });
  };

  useEffect(() => {
    if (errors['email']?.message || errors['password']?.message) setIsSubmitting(true);
    else setIsSubmitting(false);
  }, [errors['email']?.message, errors['password']?.message]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Typography variant="h5" sx={{ color: 'white' }}>
        Welcome Back!
      </Typography>
      <Typography sx={{ color: '#b9bbbe' }}>We are happy that you are with us!</Typography>
      <InputLabel
        id="email"
        label="Email"
        type="text"
        placeholder="Enter your email address"
        errors={errors}
        register={register}
        pattern={regExpEmail}
      />
      <InputLabel
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        errors={errors}
        register={register}
        minLength={6}
      />
      <Tooltip
        title={!isSubmitting ? 'Press to login' : 'Please enter correct email and password!'}
      >
        <div>
          <PrimaryButton
            type="submit"
            label="Submit"
            disabled={isSubmitting}
            classNames={{ marginTop: '30px' }}
          />
        </div>
      </Tooltip>
    </form>
  );
};

export default LoginForm;
