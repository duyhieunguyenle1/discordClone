import { Typography, styled } from '@mui/material';
import InvitationListItem from './InvitationListItem';
import { useAppSelector } from '../../../stores/store';

const MainContainer = styled('div')({
  display: 'flex',
  height: '22%',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
});

const InvitationsList = () => {
  const friendInvitations = useAppSelector(state => state.invitation.pendingFriendInvitations);

  return (
    <>
      <Typography
        sx={{
          textTransform: 'uppercase',
          color: '#8e9297',
          fontSize: '14px',
          marginTop: '10px',
        }}
      >
        Invitations
      </Typography>
      <MainContainer>
        {friendInvitations &&
          friendInvitations.length > 0 &&
          friendInvitations.map(item => (
            <InvitationListItem
              key={item._id}
              username={item.senderId?.username}
              email={item.senderId.email}
              img={item.senderId?.img}
              id={item._id}
            />
          ))}
      </MainContainer>
    </>
  );
};

export default InvitationsList;
