import { Typography, styled } from '@mui/material';
import FriendListItem from './FriendListItem';
import { useAppSelector } from '../../../stores/store';

const MainContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
  overflowY: 'auto',
});

const FriendList = () => {
  const friends = useAppSelector(state => state.invitation.friends);

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
        Private Messages
      </Typography>
      <MainContainer>
        {friends &&
          friends.length > 0 &&
          friends.map(item => (
            <FriendListItem username={item.username} id={item.id} key={item.id} img={item.img} />
          ))}
      </MainContainer>
    </>
  );
};

export default FriendList;
