import { Tooltip, styled } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link } from 'react-router-dom';

import { PATH_HOME } from '../../routes/router.path';
import useMatchedPath from '../../hooks/useMatchedPath';
import FriendSidebar from './FriendSidebar/FriendSidebar';
import ServerSidebar from './ServerSidebar/ServerSidebar';
import ChannelSidebar from './ChannelSidebar/ChannelSidebar';

const MainContainer = styled('div')({
  minWidth: '72px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#202225',
});

const Sidebar = () => {
  const routes = [{ path: '/chat/:id' }, { path: '/' }];
  const isMatchedRoute = useMatchedPath(routes);

  return (
    <>
      <MainContainer>
        <Tooltip placement="right" arrow title="Back to home">
          <div className="relative mt-[10px]">
            <Link
              className="bg-[#5865f2] text-white m-0 p-0 rounded-2xl w-12 h-12 min-w-0 flex items-center justify-center"
              to={PATH_HOME}
            >
              <GroupsIcon />
            </Link>
            {isMatchedRoute && (
              <div className="absolute left-0 top-0 w-2 flex items-center h-12 -ml-2">
                <span className="h-11 w-1 rounded-[0_4px_4px_0] bg-white absolute z-10 block" />
              </div>
            )}
          </div>
        </Tooltip>
        <div className="my-2 flex justify-center">
          <span className="bg-[#5865f2] h-[2px] w-8 rounded-sm" />
        </div>
        <ServerSidebar />
      </MainContainer>
      {isMatchedRoute ? <FriendSidebar /> : <ChannelSidebar />}
    </>
  );
};

export default Sidebar;
