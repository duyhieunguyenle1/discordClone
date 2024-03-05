import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { friendInvitationSlice } from './friendInvitation/friendInvitationSlices';
import { messagesSlice } from './messages/messagesSlices';

export const store = configureStore({
  reducer: {
    invitation: friendInvitationSlice.reducer,
    message: messagesSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
