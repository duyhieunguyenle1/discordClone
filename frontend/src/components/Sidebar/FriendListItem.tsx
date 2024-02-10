import { Box, Button, Typography } from '@mui/material';
import Avatar from '../Avatar/Avatar';
import { FiberManualRecord } from '@mui/icons-material';

interface FriendListItemProps {
  isOnline: boolean;
  id: string;
  username: string;
  img?: string;
}

const FriendListItem = ({ username, isOnline, id, img }: FriendListItemProps) => {
  return (
    <Button
      style={{
        width: '100%',
        height: '42px',
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        textTransform: 'none',
        color: 'black',
        position: 'relative',
      }}
      key={id}
    >
      <Avatar username={username} img={img} />
      <Typography
        style={{
          marginLeft: '.5rem',
          fontWeight: '700',
          color: '#8e9297',
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && (
        <Box
          sx={{
            color: '#3ba55d',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            right: '.25rem',
          }}
        >
          <FiberManualRecord />
        </Box>
      )}
    </Button>
  );
};

export default FriendListItem;
