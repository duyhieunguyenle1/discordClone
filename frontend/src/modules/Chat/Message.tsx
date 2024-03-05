import { styled, Typography } from '@mui/material';
import Avatar from '../../components/Avatar/Avatar';

const MainContainer = styled('div')({
  width: '97%',
  display: 'flex',
  marginTop: '10px',
});

const AvatarContainer = styled('div')({
  width: '70px',
});

const MessageContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const MessageContent = styled('div')({
  color: '#DCDDDE',
});

const SameAuthorContent = styled('div')({
  color: '#DCDDDE',
  width: '97%',
});

const SameAuthorText = styled('span')({
  marginLeft: '70px',
});

interface MessageProps {
  content: string;
  sameDay: boolean;
  date: string;
  sameAuthor: boolean;
  username: string;
  img?: string;
}

const Message = ({ content, sameAuthor, sameDay, date, username, img }: MessageProps) => {
  return (
    <>
      {sameAuthor && sameDay ? (
        <SameAuthorContent>
          <SameAuthorText>{content}</SameAuthorText>
        </SameAuthorContent>
      ) : (
        <MainContainer>
          <AvatarContainer>
            <Avatar username={username} img={img} />
          </AvatarContainer>
          <MessageContainer>
            <Typography style={{ fontSize: '16px', color: 'white' }}>
              {`${username} `} <span className="text-xs text-[#72767d]">{date}</span>
            </Typography>
            <MessageContent>{content}</MessageContent>
          </MessageContainer>
        </MainContainer>
      )}
    </>
  );
};

export default Message;
