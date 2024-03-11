import { styled } from '@mui/material';
import FriendSidebar from './FriendSidebar';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';
import { PATH_HOME } from '../../routes/router.path';

const MainContainer = styled('div')({
  minWidth: '72px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#202225',
});

const Sidebar = () => {
  return (
    <>
      <MainContainer>
        <Link
          className="bg-[#5865f2] text-white m-0 p-0 mt-[10px] rounded-2xl w-12 h-12 min-w-0 flex items-center justify-center"
          to={PATH_HOME}
        >
          <GroupsIcon />
        </Link>
        <div className="my-2 flex justify-center">
          <span className="bg-[#5865f2] h-[2px] w-8 rounded-sm" />
        </div>
      </MainContainer>
      <FriendSidebar />
    </>
  );
};

export default Sidebar;
