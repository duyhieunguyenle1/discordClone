import Button from '@mui/material/Button';
import { CSSProperties } from 'react';

interface PrimaryButtonProps {
  label: string;
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  classNames?: CSSProperties;
  onClick?: () => void;
}

const PrimaryButton = ({
  classNames,
  label,
  type,
  disabled,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <Button
      variant="contained"
      type={type}
      sx={{
        bgcolor: '#5865f2',
        color: 'white',
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 500,
        width: '100%',
        height: '40px',
      }}
      disabled={disabled}
      onClick={onClick}
      style={classNames}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
