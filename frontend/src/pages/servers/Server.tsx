import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainContainer = styled('div')({
  flexGrow: 1,
  backgroundColor: '#36393f',
  marginTop: '48px',
  display: 'flex',
});

const ServerPage = () => {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  );
};

export default ServerPage;
