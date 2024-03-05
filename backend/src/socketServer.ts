import { Server } from 'http';
import { Socket, Server as SocketServer } from 'socket.io';
import { verifySocketToken } from './middleware/socket.middlewares';
import { disconnectHandler, newConnection } from './handlers/socket/connect.handler';
import { getOnlineUser, setSocketServerInstance } from './handlers/socket/serverStore';
import { directChatHistoryHandler, directMessageHandler } from './handlers/socket/message.handler';
import { ContentSocket } from './types/message.types';

const registerSocketServer = (server: Server) => {
  const io = new SocketServer(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'DELETE'],
    },
    transports: ['websocket', 'polling'],
  });

  setSocketServerInstance(io);

  io.use((socket, next) => {
    verifySocketToken(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUser();

    io.emit('online-users', { onlineUsers });
  };

  io.on('connection', (socket: Socket) => {
    console.log('User connected ', socket.id);

    newConnection(socket, io);
    emitOnlineUsers();

    socket.on('direct-message', (data: ContentSocket) => {
      directMessageHandler(socket, data);
    });

    socket.on('direct-chat-history', (data: { receiverId: string }) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, 1000 * 30);
};

export { registerSocketServer };
