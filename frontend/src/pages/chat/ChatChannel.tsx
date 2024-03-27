import { styled } from '@mui/material';
import ChannelChatContainer from '../../modules/ChannelChat/ChannelChatContainer';

const MainContainer = styled('div')({
  flexGrow: 1,
  backgroundColor: '#36393f',
  marginTop: '48px',
  display: 'flex',
});

const ChatChannel = () => {
  return (
    <MainContainer>
      <ChannelChatContainer />
    </MainContainer>
  );
};

export default ChatChannel;
