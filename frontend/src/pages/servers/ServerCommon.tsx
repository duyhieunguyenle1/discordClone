import { Typography, styled } from '@mui/material';
import Header from '../../components/Header/Header';

const Wrapper = styled('div')({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const ServerCommon = () => {
  return (
    <>
      <Header label="" />
      <Wrapper>
        <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
          To start chatting or call - choose channel
        </Typography>
      </Wrapper>
    </>
  );
};

export default ServerCommon;
