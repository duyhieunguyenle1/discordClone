import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar';

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const SharedLayout = () => {
  return (
    <Wrapper>
      <Sidebar />
      <Outlet />
    </Wrapper>
  );
};

export default SharedLayout;
