import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import Avatar from '../Avatar/Avatar';
import { useAppDispatch } from '../../stores/store';
import {
  acceptFriendInvitation,
  rejectFriendInvitation,
} from '../../stores/friendInvitation/friendInvitationThunk';
import { toast } from 'react-toastify';

interface InvitationListItemProps {
  id: string;
  username: string;
  email: string;
  img?: string;
}

const InvitationListItem = ({ id, email, username, img }: InvitationListItemProps) => {
  const dispatch = useAppDispatch();

  const handleRejectInvitation = (id: string) => {
    dispatch(rejectFriendInvitation(id))
      .unwrap()
      .then(res => {
        if (res.msg) {
          toast.success(res?.msg || 'Rejected successfully');
        }
      });
  };

  const handleAcceptInvitation = (id: string) => {
    dispatch(acceptFriendInvitation(id))
      .unwrap()
      .then(res => {
        if (res.msg) {
          toast.success(res?.msg || 'Accepted successfully');
        }
      });
  };

  return (
    <Tooltip title={email}>
      <div style={{ width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: '42px',
            marginTop: '.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Avatar username={username} img={img} />
          <Typography
            sx={{
              marginLeft: '.5rem',
              fontWeight: 700,
              color: '#8e9297',
              flexGrow: 1,
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <IconButton style={{ color: 'white' }} onClick={() => handleAcceptInvitation(id)}>
              <CheckIcon />
            </IconButton>
            <IconButton style={{ color: 'white' }} onClick={() => handleRejectInvitation(id)}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </div>
    </Tooltip>
  );
};

export default InvitationListItem;
