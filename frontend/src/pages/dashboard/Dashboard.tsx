import { Typography, styled } from '@mui/material';
import Header from '../../components/Header/Header';

const MainContainer = styled('div')({
  flexGrow: 1,
  backgroundColor: '#36393f',
  marginTop: '48px',
  display: 'flex',
});

const Wrapper = styled('div')({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Dashboard = () => {
  return (
    <MainContainer>
      <Header label="" />
      <Wrapper>
        <Typography variant="h6" sx={{ color: 'white' }}>
          To start chatting - choose conversation
        </Typography>
      </Wrapper>
    </MainContainer>
  );
};

export default Dashboard;
