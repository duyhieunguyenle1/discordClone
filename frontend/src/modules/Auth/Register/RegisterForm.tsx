import { Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import InputLabel from '../../../components/InputLabel/InputLabel';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import authApi from '../../../services/auth.services';
import handleAxiosError from '../../../utils/handleAxiosError';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_HOME_FORGOT_PASSWORD, PATH_HOME_VERIFY_EMAIL } from '../../../routes/router.path';
import { toast } from 'react-toastify';

const RegisterForm = () => {
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
      username: '',
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = data => {
    authApi
      .register(data)
      .then(res => {
        if (res.status === 201) {
          toast.warn('Verify email to continue');
          navigate(`${PATH_HOME_VERIFY_EMAIL}?e=${data?.email}`);
          authApi
            .sendOtp('', data.email)
            .then(res => {
              if (res.status === 200) {
              }
            })
            .catch(err2 => handleAxiosError(err2));
        }
      })
      .catch(err => handleAxiosError(err));
  };

  useEffect(() => {
    if (errors['email']?.message || errors['password']?.message || errors['username']?.message)
      setIsSubmitting(true);
    else setIsSubmitting(false);
  }, [errors['username']?.message, errors['password']?.message, errors['email']?.message]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Typography variant="h5" sx={{ color: 'white' }}>
        Create an account
      </Typography>
      <InputLabel
        label="Email"
        type="text"
        placeholder="Please enter email address"
        register={register}
        id="email"
        errors={errors}
        pattern={regExpEmail}
      />
      <InputLabel
        id="username"
        label="Username"
        placeholder="Please enter your username"
        register={register}
        errors={errors}
        type="text"
        minLength={3}
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
      <div className="mt-1">
        <Link to={PATH_HOME_FORGOT_PASSWORD} className="text-blue-500 underline text-sm">
          Forgot password
        </Link>
      </div>
      <Tooltip
        title={!isSubmitting ? 'Press to login' : 'Please enter correct email and password!'}
      >
        <div>
          <PrimaryButton
            type="submit"
            label="Submit"
            disabled={isSubmitting}
            classNames={{ marginTop: '18px' }}
          />
        </div>
      </Tooltip>
    </form>
  );
};

export default RegisterForm;
