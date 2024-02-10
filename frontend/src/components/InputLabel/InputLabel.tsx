import { styled } from '@mui/system';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  marginTop: '1.25rem',
});

const Label = styled('label')({
  color: '#b9bbbe',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px',
  marginBottom: '.65rem',
});

const Input = styled('input')({
  flexGrow: 1,
  height: '40px',
  border: '1px solid black',
  borderRadius: '5px',
  color: '#dcddde',
  background: '#35393f',
  margin: 0,
  fontSize: '16px',
  padding: '0 .5rem',
  width: '100%',
  outline: 'none',
});

interface InputLabelProps {
  label: string;
  placeholder: string;
  pattern?: RegExp;
  errors: FieldErrors;
  minLength?: number;
  register: UseFormRegister<FieldValues>;
  id: string;
  type: 'password' | 'text' | 'email';
}

const InputLabel = ({
  label,
  type,
  placeholder,
  id,
  errors,
  pattern,
  register,
  minLength,
}: InputLabelProps) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative w-full">
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, {
            required: {
              value: true,
              message: `${id.charAt(0).toUpperCase() + id.slice(1)} field is required!`,
            },
            pattern: {
              value: pattern!,
              message: 'Please enter valid value',
            },
            minLength: {
              value: minLength!,
              message: `${
                id.charAt(0).toUpperCase() + id.slice(1)
              } must be at least ${minLength} character!`,
            },
          })}
          style={{
            borderColor: errors[id] && 'red',
          }}
        />
        <div className="absolute -bottom-4 left-0 mt-1 text-xs text-invalidColor">
          {errors[id]?.message as string}
        </div>
      </div>
    </Wrapper>
  );
};

export default InputLabel;
