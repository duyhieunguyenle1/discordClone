import { MoreVert } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MouseEvent, useState } from 'react';
import authApi from '../../services/auth.services';
import { useNavigate } from 'react-router-dom';
import storage from '../../utils/storage';

const MainContainer = styled('div')({
  position: 'absolute',
  right: '0',
  top: '0',
  height: '48px',
  borderBottom: '1px solid black',
  backgroundColor: '#36393f',
  width: 'calc(100% - 296px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  padding: '0 15px',
});

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutButton = () => {
    authApi.logout().then(res => {
      if (res.status === 200) {
        storage.clearAccessToken();
        storage.clearUserLocal();
        navigate(0);
      }
    });
  };

  return (
    <MainContainer>
      <IconButton onClick={handleClick} style={{ color: 'white' }}>
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogoutButton}>Logout</MenuItem>
      </Menu>
    </MainContainer>
  );
};

export default Header;
