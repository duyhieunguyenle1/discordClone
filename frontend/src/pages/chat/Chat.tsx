import { styled } from '@mui/material';
import ChatDetails from '../../modules/Chat/ChatDetails';

const MainContainer = styled('div')({
  flexGrow: 1,
  backgroundColor: '#36393f',
  marginTop: '48px',
  display: 'flex',
});

const ChatPage = () => {
  return (
    <MainContainer>
      <ChatDetails />
    </MainContainer>
  );
};

export default ChatPage;
