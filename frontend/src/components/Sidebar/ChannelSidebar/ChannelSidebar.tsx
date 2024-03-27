import { Tooltip, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import { ServerProps } from '../../../types/server.types';
import serverApi from '../../../services/server.services';
import handleAxiosError from '../../../utils/handleAxiosError';
import { ChannelProps, ChannelType } from '../../../types/channel.types';
import channelApi from '../../../services/channel.services';
import DropdownChannel from './DropdownChannel';

const MainContainer = styled('div')({
  minWidth: '224px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#2f3136',
});

const initialServer: ServerProps = {
  channels: [],
  createdAt: new Date(Date.now()),
  updatedAt: new Date(Date.now()),
  inviteCode: '',
  name: '',
  _id: '',
  imgUrl: '',
  owner: '',
};

const initialChannels: ChannelProps[] = [
  {
    _id: '',
    type: ChannelType.TEXT,
    name: '',
    server: '',
  },
];

const ChannelSidebar = () => {
  const [server, setServer] = useState<ServerProps>(initialServer);
  const [channels, setChannels] = useState<ChannelProps[]>(initialChannels);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    serverApi
      .getServerByParam(id!)
      .then(res => {
        if (res.status === 200) {
          setServer(res.data.server);
        }
      })
      .catch(err => handleAxiosError(err));

    channelApi
      .getAllChannelsOfServer(id!)
      .then(res => {
        if (res.status === 200) {
          setChannels(res.data.channels);
        }
      })
      .catch(err2 => handleAxiosError(err2));
  }, []);

  return (
    <MainContainer>
      <div className="h-12 w-full shadow-[#020202_0px_1px_0px_0px]">
        <header className="font-medium px-4 py-3 w-full flex justify-between items-center">
          <div className="text-white flex-1">{server?.name}</div>
          <DropdownChannel serverId={id!} />
        </header>
      </div>
      <div className="overflow-x-hidden overflow-y-auto flex-1 w-full z-10 pr-0">
        <ul className="list-none">
          <div className="w-full h-[1px] ml-2 bg-[#3d3b44] mt-6" />
          <li className="pt-4 pl-5 pr-2 h-10 flex items-center justify-between">
            <div className="flex-1 relative text-textMain">
              <ExpandMoreIcon className="absolute -left-4 top-0 max-h-4 max-w-4" />
              <h6 className="uppercase text-xs">Text Channels</h6>
            </div>
            <Tooltip title="Create Channel" arrow placement="top">
              <div className="cursor-pointer mr-2" role="button">
                <AddIcon className="text-textMain max-h-5 max-w-5 hover:text-textHover transition-all duration-300" />
              </div>
            </Tooltip>
          </li>
          {channels
            .filter(channel => channel.type === ChannelType.TEXT)
            .map(chann => (
              <li key={chann._id}>
                <div className="ml-2">
                  <Link
                    to={`/server/${id}/${chann._id}`}
                    className="p-2"
                    style={{ display: 'block' }}
                  >
                    <div className="flex items-center h-fit">
                      <span className="mr-[6px]">
                        <svg
                          className="icon_eff5d4"
                          aria-hidden="true"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#949ba4"
                            fillRule="evenodd"
                            d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <div className="flex-1 text-textMain font-medium text-[15px]">
                        {chann.name}
                      </div>
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          <li className="pt-4 pl-5 pr-2 h-10 flex items-center justify-between">
            <div className="flex-1 relative text-textMain">
              <ExpandMoreIcon className="absolute -left-4 top-0 max-h-4 max-w-4" />
              <h6 className="uppercase text-xs">Voice Channels</h6>
            </div>
            <Tooltip title="Create Channel" arrow placement="top">
              <div className="cursor-pointer mr-2" role="button">
                <AddIcon className="text-textMain max-h-5 max-w-5 hover:text-textHover transition-all duration-300" />
              </div>
            </Tooltip>
          </li>
          {channels
            .filter(channel => channel.type === ChannelType.AUDIO)
            .map(chann => (
              <li key={chann._id}>
                <div className="ml-2">
                  <div className="p-2 flex items-center h-fit">
                    <span className="mr-[6px]">
                      <svg
                        className="icon_eff5d4"
                        aria-hidden="true"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#949ba4"
                          d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"
                        ></path>
                        <path
                          fill="#949ba4"
                          d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"
                        ></path>
                      </svg>
                    </span>
                    <div className="flex-1 text-textMain font-medium text-[15px]">{chann.name}</div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </MainContainer>
  );
};

export default ChannelSidebar;
