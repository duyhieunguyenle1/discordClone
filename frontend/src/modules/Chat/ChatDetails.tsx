import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import userApi from '../../services/user.services';
import handleAxiosError from '../../utils/handleAxiosError';
import { IUser } from '../../types/user.types';
import { styled } from '@mui/material';
import ChatContent from './ChatContent';
import { getDirectChatHistory } from '../../configs/connectSocket';
import { useAppDispatch } from '../../stores/store';
import { resetMessages } from '../../stores/messages/messagesSlices';

const Wrapper = styled('div')({
  flexGrow: 1,
});

const ChatDetails = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useAppDispatch();

  const [userChat, setUserChat] = useState<IUser>();

  useEffect(() => {
    userApi
      .getUserById(id!)
      .then(res => {
        if (res.status === 200) {
          setUserChat(res.data.user);
          dispatch(resetMessages());
          if (id) {
            getDirectChatHistory({ receiverId: id });
          }
        }
      })
      .catch(err => handleAxiosError(err));
  }, [id]);

  return (
    <>
      <Header label={userChat?.username || ''} />
      <Wrapper>
        <ChatContent user={userChat!} />
      </Wrapper>
    </>
  );
};

export default ChatDetails;
