import { Typography, styled } from '@mui/material';
import { CSSProperties } from 'react';

interface RedirectLabelProps {
  label: string;
  classNames?: CSSProperties;
  redirectText: string;
  redirectRoute: string;
}

const RedirectText = styled('a')({
  color: '#00aff4',
  fontWeight: '500',
  cursor: 'pointer',
  textDecoration: 'none',
});

const RedirectLabel = ({ label, classNames, redirectRoute, redirectText }: RedirectLabelProps) => {
  return (
    <Typography sx={{ color: '#72767d' }} style={classNames} variant="subtitle2">
      {label}
      <RedirectText href={redirectRoute} style={{ marginLeft: '.25rem' }}>
        {redirectText}
      </RedirectText>
    </Typography>
  );
};

export default RedirectLabel;
