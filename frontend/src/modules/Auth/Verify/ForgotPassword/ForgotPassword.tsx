import { Link } from 'react-router-dom';
import { PATH_HOME_LOGIN, PATH_HOME_REGISTER } from '../../../../routes/router.path';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Tooltip, Typography } from '@mui/material';
import InputLabel from '../../../../components/InputLabel/InputLabel';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import PrimaryButton from '../../../../components/Button/PrimaryButton';
import RedirectLabel from '../../../../components/Redirect/RedirectLabel';
import authApi from '../../../../services/auth.services';
import handleAxiosError from '../../../../utils/handleAxiosError';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const regExpEmail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = data => {
    authApi
      .forgotPassword(data)
      .then(res => {
        if (res.status === 200) {
          toast.success(res.data.msg || 'Reset link has been sent to your email');
        }
      })
      .catch(err => handleAxiosError(err));
  };

  useEffect(() => {
    if (errors['email']?.message) setIsSubmitting(true);
    else setIsSubmitting(false);
  }, [errors['email']?.message]);

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
          id="email"
          label="Email"
          type="text"
          placeholder="Enter your email address"
          errors={errors}
          register={register}
          pattern={regExpEmail}
        />
        <Tooltip title={!isSubmitting ? 'Press to continue' : 'Please enter correct email!'}>
          <div>
            <PrimaryButton
              type="submit"
              label="Continue"
              disabled={isSubmitting}
              classNames={{ marginTop: '32px' }}
            />
          </div>
        </Tooltip>
      </form>
      <RedirectLabel
        label="Need an account?"
        redirectText="Create an account"
        classNames={{
          marginTop: '1.5rem',
        }}
        redirectRoute={PATH_HOME_REGISTER}
      />
    </>
  );
};

export default ForgotPassword;
