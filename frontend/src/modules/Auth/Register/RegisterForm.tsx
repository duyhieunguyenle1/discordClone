import { Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import InputLabel from '../../../components/InputLabel/InputLabel';
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import authApi from '../../../services/auth.services';
import handleAxiosError from '../../../utils/handleAxiosError';
import storage from '../../../utils/storage';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

const RegisterForm = () => {
  const regExpEmail = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g,
  );
  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);

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

  const onSubmitHandler: SubmitHandler<
    FieldValues
  > = data => {
    authApi
      .register(data)
      .then(res => {
        if (res.status === 201) {
          storage.setAccessToken(res.data.accessToken);
          toast.success('Register successfully!');
          redirect('/');
        }
      })
      .catch(err => handleAxiosError(err));
  };

  useEffect(() => {
    if (
      errors['email']?.message ||
      errors['password']?.message ||
      errors['username']?.message
    )
      setIsSubmitting(true);
    else setIsSubmitting(false);
  }, [
    errors['username']?.message,
    errors['password']?.message,
    errors['email']?.message,
  ]);

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
      <Tooltip
        title={
          !isSubmitting
            ? 'Press to login'
            : 'Please enter correct email and password!'
        }
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

export default RegisterForm;
