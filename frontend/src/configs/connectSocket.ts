import io, { Socket } from 'socket.io-client';
import storage from '../utils/storage';
import { isTokenExpired, newAccessToken } from '../utils/token';
import {
  sendFriendInvitation,
  setFriends,
  setOnlineFriends,
} from '../stores/friendInvitation/friendInvitationThunk';
import { FieldValues } from 'react-hook-form';
import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { IFriend } from '../types/friend.types';
import { ChatSchemaProps, ContentSocket } from '../types/message.types';
import { setDetailMessage } from '../stores/messages/messagesThunk';

const socketPort = import.meta.env.VITE_DOMAIN_SOCKET;

type dispatchProps = Dispatch<UnknownAction> & ThunkDispatch<any, undefined, UnknownAction>;

let socket: Socket;

export const connectSocket = async (dispatch: dispatchProps) => {
  let token = storage.getAccessToken();

  if (isTokenExpired(token!)) {
    token = await newAccessToken();
  }

  socket = io(socketPort, {
    auth: {
      token: token,
    },
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('Successfully connected with socket.io', socket.id);
  });

  socket.on('friends-invitations', (data: FieldValues) => {
    dispatch(sendFriendInvitation(data));
  });

  socket.on('friends-list', data => {
    const { friends } = data;
    friends.forEach((friend: IFriend) => {
      dispatch(setFriends(friend));
    });
  });

  socket.on('online-users', data => {
    const { onlineUsers } = data;
    dispatch(setOnlineFriends(onlineUsers));
  });

  socket.on('direct-chat-history', (data: ChatSchemaProps) => {
    dispatch(setDetailMessage(data));
  });

  socket.on('connect_error', (err: any) => {
    console.warn(err);
  });
};

export const sendDirectMessage = (data: ContentSocket) => {
  socket.emit('direct-message', data);
};

export const getDirectChatHistory = (data: { receiverId: string }) => {
  if (data.receiverId) {
    socket.emit('direct-chat-history', data);
  }
};
