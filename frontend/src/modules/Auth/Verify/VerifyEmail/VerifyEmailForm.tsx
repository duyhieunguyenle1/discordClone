import { KeyboardEvent, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import authApi from '../../../../services/auth.services';
import handleAxiosError from '../../../../utils/handleAxiosError';
import storage from '../../../../utils/storage';
import { PATH_HOME_LOGIN } from '../../../../routes/router.path';

const VerifyEmailForm = () => {
  const [searchParams] = useSearchParams('');
  const navigate = useNavigate();

  const [otp1, setOtp1] = useState<string>('');
  const [otp2, setOtp2] = useState<string>('');
  const [otp3, setOtp3] = useState<string>('');
  const [otp4, setOtp4] = useState<string>('');
  const [otp5, setOtp5] = useState<string>('');
  const [otp6, setOtp6] = useState<string>('');

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleKeyUp = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length < e.currentTarget.maxLength) {
      const nextIndex = index - 1;
      if (nextIndex < inputRefs.current.length && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }

    if (e.currentTarget.value.length === e.currentTarget.maxLength) {
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length && inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }

      if (index === 5) {
        onSubmitHandler();
      }
    }
  };

  const onSubmitHandler = () => {
    const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    const email = searchParams.get('e');

    authApi
      .verifyOtp(otp, email!)
      .then(res => {
        if (res.status === 200) {
          storage.setAccessToken(res.data.accessToken);
          navigate(0);
        }
      })
      .catch(err => handleAxiosError(err));
  };

  const onClickResendHandler = () => {
    const email = searchParams.get('e');

    authApi
      .sendOtp(email!, '')
      .then(res => {
        if (res.status === 200) {
          toast.success(res.data.msg || 'Resend succesfully');
        }
      })
      .catch(err => handleAxiosError(err));
  };

  return (
    <form className="relative">
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
          fontWeight: '600',
          marginBottom: '1rem',
          marginTop: '1.25rem',
        }}
      >
        Verify your email address
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: 'white',
          textAlign: 'center',
          fontSize: '0.75rem',
          fontWeight: '300',
          marginBottom: '.5rem',
        }}
      >
        We emailed you a six-digit code to{' '}
        <span className="font-bold">{searchParams.get('e')}</span>. Enter the code <br />
        below to confirm your email address.
      </Typography>
      <div className="flex justify-center mt-9">
        <input
          type="text"
          maxLength={1}
          min={1}
          onWheel={e => e.currentTarget.blur()}
          onChange={e => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setOtp1(e.target.value);
            }
          }}
          onKeyUp={e => handleKeyUp(0, e)}
          ref={el => (inputRefs.current[0] = el as HTMLInputElement)}
          required
          value={otp1}
          className="max-w-16 h-24 mr-3 rounded-xl border border-[rgba(98,122,209,.12)] outline-none text-center text-3xl "
        />
        <input
          type="text"
          maxLength={1}
          min={1}
          onWheel={e => e.currentTarget.blur()}
          onChange={e => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setOtp2(e.target.value);
            }
          }}
          onKeyUp={e => handleKeyUp(1, e)}
          ref={el => (inputRefs.current[1] = el as HTMLInputElement)}
          required
          value={otp2}
          className="max-w-16 h-24 mr-3 rounded-xl border border-[rgba(98,122,209,.12)] outline-none text-center text-3xl "
        />
        <input
          type="text"
          maxLength={1}
          min={1}
          onWheel={e => e.currentTarget.blur()}
          onChange={e => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setOtp3(e.target.value);
            }
          }}
          onKeyUp={e => handleKeyUp(2, e)}
          ref={el => (inputRefs.current[2] = el as HTMLInputElement)}
          required
          value={otp3}
          className="max-w-16 h-24 mr-3 rounded-xl border border-[rgba(98,122,209,.12)] outline-none text-center text-3xl "
        />
        <input
          type="text"
          maxLength={1}
          min={1}
          onWheel={e => e.currentTarget.blur()}
          onChange={e => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setOtp4(e.target.value);
            }
          }}
          onKeyUp={e => handleKeyUp(3, e)}
          ref={el => (inputRefs.current[3] = el as HTMLInputElement)}
          required
          value={otp4}
          className="max-w-16 h-24 mr-3 rounded-xl border border-[rgba(98,122,209,.12)] outline-none text-center text-3xl "
        />
        <input
          type="text"
          maxLength={1}
          min={1}
          onWheel={e => e.currentTarget.blur()}
          onChange={e => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setOtp5(e.target.value);
            }
          }}
          onKeyUp={e => handleKeyUp(4, e)}
          ref={el => (inputRefs.current[4] = el as HTMLInputElement)}
          required
          value={otp5}
          className="max-w-16 h-24 mr-3 rounded-xl border border-[rgba(98,122,209,.12)] outline-none text-center text-3xl "
        />
        <input
          type="text"
          maxLength={1}
          min={1}
          onWheel={e => e.currentTarget.blur()}
          onChange={e => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setOtp6(e.target.value);
            }
          }}
          onKeyUp={e => handleKeyUp(5, e)}
          ref={el => (inputRefs.current[5] = el as HTMLInputElement)}
          required
          value={otp6}
          className="max-w-16 h-24 mr-3 rounded-xl border border-[rgba(98,122,209,.12)] outline-none text-center text-3xl "
        />
      </div>
      <p className="text-center text-[#556789] text-sm mt-20">
        Make sure to keep this window open while check your inbox.
        <span className="ml-2 text-[#627ad1] cursor-pointer" onClick={onClickResendHandler}>
          Resend it
        </span>
      </p>
    </form>
  );
};

export default VerifyEmailForm;
