import { Server as SocketServer, Socket } from 'socket.io';
import { addNewConnectedUser, removeConnectedUser } from './serverStore';
import { updateFriends, updatePendingInvitations } from './friend.handler';

const newConnection = async (socket: Socket, io: SocketServer) => {
  const userDetails = socket?.user;

  addNewConnectedUser({
    socketId: socket?.id,
    userId: userDetails?.user_id,
  });

  updatePendingInvitations(userDetails.user_id);
  updateFriends(userDetails.user_id);
};

const disconnectHandler = (socket: Socket) => {
  removeConnectedUser(socket.id);
};

export { newConnection, disconnectHandler };
