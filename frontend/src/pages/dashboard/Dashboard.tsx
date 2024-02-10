import { styled } from '@mui/material';

const MainContainer = styled('div')({
  flexGrow: 1,
  backgroundColor: '#36393f',
  marginTop: '48px',
  display: 'flex',
});

const Dashboard = () => {
  return <MainContainer>Dashboard</MainContainer>;
};

export default Dashboard;
