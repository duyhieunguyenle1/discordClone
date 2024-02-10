import { styled } from '@mui/material';

interface AvatarProps {
  username: string;
  img?: string;
  large?: boolean;
}

const AvatarPreview = styled('img')({
  height: '42px',
  width: '42px',
  borderRadius: '999px',
  marginLeft: '.25rem',
});

const AvatarPreview2 = styled('div')({
  height: '42px',
  width: '42px',
  backgroundColor: '#5865f2',
  borderRadius: '999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: '700',
  marginLeft: '.25rem',
  color: 'white',
});

const Avatar = ({ username, img, large }: AvatarProps) => {
  return (
    <>
      {img ? (
        <AvatarPreview src={img} />
      ) : (
        <AvatarPreview2 style={large ? { height: '80px', width: '80px' } : {}}>
          {username.substring(0, 2)}
        </AvatarPreview2>
      )}
    </>
  );
};

export default Avatar;
