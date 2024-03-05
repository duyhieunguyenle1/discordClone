import { createAsyncThunk } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import friendApi from '../../services/friend.services';
import handleAxiosError from '../../utils/handleAxiosError';
import {
  rejectInvitationPending,
  setFriend,
  setInvitationPending,
  setOnlineFriend,
} from './friendInvitationSlices';
import { IFriend, IOnlineUser } from '../../types/friend.types';

const setFriends = createAsyncThunk('friends/setFriends', async (data: IFriend, { dispatch }) => {
  try {
    if (data) {
      dispatch(setFriend(data));
    }
  } catch (error) {
    return handleAxiosError(error);
  }
});

const setOnlineFriends = createAsyncThunk(
  'friend/setOnlineFriends',
  async (data: IOnlineUser[], { dispatch }) => {
    try {
      if (data) {
        data.forEach(item => {
          dispatch(setOnlineFriend(item));
        });
      }
    } catch (error) {
      return handleAxiosError(error);
    }
  },
);

const sendFriendInvitation = createAsyncThunk(
  'invitation/setInvitationPending',
  async (data: FieldValues, { dispatch }) => {
    try {
      const { email, pendingFriendInvitations } = data;

      if (email) {
        const res = await friendApi.sendInvite(data);
        return res.data;
      }

      if (pendingFriendInvitations) {
        dispatch(setInvitationPending(pendingFriendInvitations[0]));
      }
    } catch (error) {
      return handleAxiosError(error);
    }
  },
);

const rejectFriendInvitation = createAsyncThunk(
  'invitation/rejectFriendInvitation',
  async (id: string, { dispatch }) => {
    try {
      if (id) {
        const res = await friendApi.rejectInvite(id);
        dispatch(rejectInvitationPending(id));

        return res.data;
      }
    } catch (error) {
      return handleAxiosError(error);
    }
  },
);

const acceptFriendInvitation = createAsyncThunk(
  'invitation/acceptFriendInvitation',
  async (id: string, { dispatch }) => {
    try {
      if (id) {
        const res = await friendApi.acceptInvite(id);
        dispatch(rejectInvitationPending(id));

        return res.data;
      }
    } catch (error) {
      return handleAxiosError(error);
    }
  },
);

export {
  sendFriendInvitation,
  rejectFriendInvitation,
  acceptFriendInvitation,
  setFriends,
  setOnlineFriends,
};
