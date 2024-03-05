import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFriend, IFriendInvitation, IOnlineUser } from '../../types/friend.types';

export interface friendInvitationState {
  friends: IFriend[];
  onlineUser: IOnlineUser[];
  pendingFriendInvitations: IFriendInvitation[];
}

const initialState: friendInvitationState = {
  friends: [],
  onlineUser: [],
  pendingFriendInvitations: [],
};

export const friendInvitationSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    setInvitationPending: (state, action: PayloadAction<IFriendInvitation>) => {
      const isContain = state.pendingFriendInvitations.find(
        item => (JSON.stringify(item) === JSON.stringify(action.payload)) !== undefined,
      );
      if (!isContain && action.payload) {
        state.pendingFriendInvitations.push(action.payload);
      }
    },
    rejectInvitationPending: (state, action: PayloadAction<string>) => {
      const isContain = state.pendingFriendInvitations.find(item => item._id === action.payload);

      if (isContain && action.payload) {
        state.pendingFriendInvitations = state.pendingFriendInvitations.filter(
          item => item._id !== action.payload,
        );
      }
    },
    setFriend: (state, action: PayloadAction<IFriend>) => {
      const isContain = state.friends.find(
        item => JSON.stringify(item) === JSON.stringify(action.payload),
      );
      if (!isContain && action.payload) {
        state.friends = [...state.friends, action.payload];
      }
    },
    setOnlineFriend: (state, action: PayloadAction<IOnlineUser>) => {
      const isContain = state.onlineUser.find(item => item.userId === action.payload.userId);
      if (!isContain && action.payload) {
        state.onlineUser.push(action.payload);
      }
    },
  },
});

export const { setInvitationPending, setFriend, setOnlineFriend, rejectInvitationPending } =
  friendInvitationSlice.actions;
export default friendInvitationSlice.reducer;
