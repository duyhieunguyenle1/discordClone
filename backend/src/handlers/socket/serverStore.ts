import { Server as SocketServer } from 'socket.io';

interface addNewConnectedUserProps {
  socketId: string;
  userId: string;
}

const connectedUsers = new Map<string, { userId: string }>();

let io: SocketServer;

const setSocketServerInstance = (ioInstance: SocketServer) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }: addNewConnectedUserProps) => {
  connectedUsers.set(socketId, { userId });
};

const removeConnectedUser = (socketId: string) => {
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    console.log('Deleted user', connectedUsers);
  }
};

const getActiveConnections = (userId: string) => {
  const activeConnections: string[] = [];

  connectedUsers.forEach((value: { userId: string }, key: string) => {
    if (value.userId === userId) {
      activeConnections.push(key);
    }
  });

  return activeConnections;
};

const getOnlineUser = () => {
  const onlineUser: addNewConnectedUserProps[] = [];

  connectedUsers.forEach((value, key) => {
    onlineUser.push({ socketId: key, userId: value.userId });
  });

  return onlineUser;
};

export {
  addNewConnectedUser,
  removeConnectedUser,
  getActiveConnections,
  setSocketServerInstance,
  getSocketServerInstance,
  getOnlineUser,
};
