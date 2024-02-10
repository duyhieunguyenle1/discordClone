import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IFriend, IFriendInvitation } from '../../types/friend.types';

export interface friendInvitationState {
  friends: IFriend[];
  onlineUser: [];
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
      return state;
    },
    rejectInvitationPending: (state, action: PayloadAction<string>) => {
      const isContain = state.pendingFriendInvitations.find(item => item._id === action.payload);

      if (isContain && action.payload) {
        state.pendingFriendInvitations = state.pendingFriendInvitations.filter(
          item => item._id !== action.payload,
        );
      }
      return state;
    },
    setFriend: (state, action: PayloadAction<IFriend>) => {
      const isContain = state.friends.find(
        item => JSON.stringify(item) === JSON.stringify(action.payload),
      );
      if (!isContain && action.payload) {
        state.friends = [...state.friends, action.payload];
      }
      return state;
    },
    setOnlineFriends: (state, action: PayloadAction<any>) => {
      state.onlineUser = action.payload.onlineUser;
    },
  },
});

export const { setInvitationPending, setFriend, setOnlineFriends, rejectInvitationPending } =
  friendInvitationSlice.actions;
export default friendInvitationSlice.reducer;
