import { Modal, Tooltip, Typography, styled } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from 'lodash';

import userApi from '../../../services/user.services';
import handleAxiosError from '../../../utils/handleAxiosError';

const Wrapper = styled('form')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '440px',
  backgroundColor: '#313338',
  boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.5)',
});

const DropdownChannel = ({ serverId }: { serverId: string }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    userApi
      .getFriendsOfServer(serverId)
      .then(res => {
        if (res.status === 200) {
          setFriends(res.data.users);
        }
      })
      .catch(err => handleAxiosError(err));
  }, []);

  const sendRequest = (value: string) => {
    // send value to the backend
  };

  const debouncedSendRequest = debounce(sendRequest, 500);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // state is updated on every value change, so input will work
    setSearchValue(value);

    // call debounced request here
    debouncedSendRequest(value);
  };

  return (
    <>
      <Tooltip title="Invite People" arrow>
        <div className="-mr-[2px] cursor-pointer" onClick={() => setOpenModal(!openModal)}>
          <AddIcon className="text-textMain" />
        </div>
      </Tooltip>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Wrapper>
          <div className="px-6 my-6">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h3"
              className="text-center text-white text-xl"
              sx={{ fontWeight: 500 }}
            >
              Invite friends to server
            </Typography>
            <span
              className="absolute top-1 right-2 p-1 text-white cursor-pointer hover:opacity-75 transition-all duration-300"
              onClick={() => setOpenModal(false)}
            >
              <CloseIcon />
            </span>
            <input onChange={onChange} value={searchValue} />
            <div className="flex flex-col my-4">
              <div className="mt-3">hi</div>
            </div>
          </div>
          <div className="p-6 bg-[#2b2d31] flex justify-between">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="text-[#dbdee1] font-medium transition-all duration-300 hover:opacity-75"
            >
              Back
            </button>
            <button
              type="submit"
              className="text-white bg-[#5865f2] px-5 py-2 border-none rounded hover:bg-[#4752c4] transition-all duration-300"
            >
              Create
            </button>
          </div>
        </Wrapper>
      </Modal>
    </>
  );
};

export default DropdownChannel;
