import { Box, Button, Typography } from '@mui/material';
import Avatar from '../../Avatar/Avatar';
import { FiberManualRecord } from '@mui/icons-material';
import { useAppSelector } from '../../../stores/store';
import { IOnlineUser } from '../../../types/friend.types';
import { Link } from 'react-router-dom';

interface FriendListItemProps {
  id: string;
  username: string;
  img?: string;
}

const FriendListItem = ({ username, id, img }: FriendListItemProps) => {
  const onlineFriends: IOnlineUser[] = useAppSelector(state => state.invitation.onlineUser);
  const onlineUserIds = new Set(onlineFriends.map(user => user.userId));

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
        textDecoration: 'none',
        transition: 'all 0.3s',
      }}
      sx={{
        '&:hover': {
          backgroundColor: '#898989',
        },
      }}
    >
      <Link to={`/chat/${id}`} className="w-full flex items-center">
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
        {onlineUserIds.has(id) && (
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
      </Link>
    </Button>
  );
};

export default FriendListItem;
