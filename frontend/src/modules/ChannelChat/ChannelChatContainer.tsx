import { styled } from '@mui/material';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import channelApi from '../../services/channel.services';
import handleAxiosError from '../../utils/handleAxiosError';
import { ChannelProps } from '../../types/channel.types';
import ChannelChatContent from './ChannelChatContent';

const Wrapper = styled('div')({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ChannelChatContainer = () => {
  const params = useParams();
  const { id, channelId } = params;

  const [userChat, setUserChat] = useState<ChannelProps>();

  useEffect(() => {
    channelApi
      .getChannelOfServer(id!, channelId!)
      .then(res => {
        if (res.status === 200) {
          setUserChat(res.data.channel);
        }
      })
      .catch(err => handleAxiosError(err));
  }, []);

  return (
    <>
      <Header label={userChat?.name || ''} />
      <Wrapper>
        <ChannelChatContent />
      </Wrapper>
    </>
  );
};

export default ChannelChatContainer;
