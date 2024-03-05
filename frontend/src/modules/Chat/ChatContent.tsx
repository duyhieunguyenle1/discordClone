import { SubmitHandler, useForm } from 'react-hook-form';

import { Typography, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { IUser } from '../../types/user.types';
import Avatar from '../../components/Avatar/Avatar';
import Message from './Message';
import { sendDirectMessage } from '../../configs/connectSocket';
import { ContentSchema } from '../../types/message.types';
import { useAppSelector } from '../../stores/store';
import convertDate from '../../utils/convertDate';
import ChatDateSeparator from './ChatDateSeparator';

const MainContainer = styled('div')({
  height: 'calc(100% - 60px)',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const HeaderContainer = styled('div')({
  width: '98%',
  flexDirection: 'column',
  marginTop: '10px',
});

const ChatContent = ({ user }: { user: IUser }) => {
  const { messages } = useAppSelector(state => state.message);

  const { register, handleSubmit, setValue } = useForm<ContentSchema>({
    defaultValues: {
      content: '',
      img: '',
    },
  });

  const handleSendMessage: SubmitHandler<ContentSchema> = data => {
    if (data) {
      sendDirectMessage({ content: data.content, receiverId: user?._id, img: data.img });
      setValue('content', '');
    }
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <Avatar large username={user?.username || ''} img={user?.img} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          {user?.username}
        </Typography>
        <Typography sx={{ color: '#b9bbbe', marginLeft: '5px', marginRight: '5px' }}>
          This is the beginning of your conversation with {user?.username}
        </Typography>
      </HeaderContainer>
      <div className="flex-1 w-[98%]">
        {messages.map((message, index) => {
          const sameAuthor =
            index > 0 && messages[index].author._id === messages[index - 1].author._id;

          const sameDay =
            index > 0 &&
            convertDate(new Date(message.createdAt), 'dd/mm/yy') ===
              convertDate(new Date(messages[index - 1].createdAt), 'dd/mm/yy');

          return (
            <div key={message._id} style={{ width: '97%' }}>
              {(!sameDay || index === 0) && (
                <ChatDateSeparator date={convertDate(new Date(message.createdAt), 'dd/mm/yyyy')} />
              )}
              <Message
                key={message._id}
                username={message?.author.username || ''}
                sameAuthor={sameAuthor}
                date={convertDate(new Date(message.createdAt), 'dd/mm/yyyy')}
                content={message?.content || ''}
                sameDay={sameDay}
                img={message?.img}
              />
            </div>
          );
        })}
      </div>
      <form
        className="h-[60px] w-[98%] flex items-center justify-between"
        onSubmit={handleSubmit(handleSendMessage)}
      >
        <div className="bg-[#2f3136] w-full rounded-lg p-3 flex">
          <input
            type="text"
            className="text-white border-none text-sm outline-none flex-1 bg-[#2f3136]"
            placeholder={`Write message to ${user?.username}`}
            id="content"
            {...register('content')}
          />
          <button type="submit" className="hover:opacity-70 transition-all duration-200">
            <SendIcon style={{ color: '#a0a0a0' }} />
          </button>
        </div>
      </form>
    </MainContainer>
  );
};

export default ChatContent;
