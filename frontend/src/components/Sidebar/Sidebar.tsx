import { Button, styled } from '@mui/material';
import FriendSidebar from './FriendSidebar';
import GroupsIcon from '@mui/icons-material/Groups';

const MainContainer = styled('div')({
  minWidth: '72px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#202225',
});

const Sidebar = () => {
  return (
    <>
      <MainContainer>
        <Button
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: '10px',
            color: 'white',
            backgroundColor: '#5865f2',
          }}
        >
          <GroupsIcon />
        </Button>
      </MainContainer>
      <FriendSidebar />
    </>
  );
};

export default Sidebar;
