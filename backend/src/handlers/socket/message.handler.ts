import { Socket } from 'socket.io';
import { ContentSocket } from '../../types/message.types';
import Message from '../../models/message.model';
import Conversation from '../../models/conversation.model';
import { getActiveConnections, getSocketServerInstance } from './serverStore';

const directMessageHandler = async (socket: Socket, data: ContentSocket) => {
  try {
    const { user_id } = socket.user;

    const { receiverId, content } = data;

    if (user_id && receiverId) {
      const message = await Message.create({
        content: content,
        author: receiverId,
        type: 'DIRECT',
      });

      const conversation = await Conversation.findOne({
        participants: { $all: [user_id, receiverId] },
      });

      if (conversation) {
        conversation.messages = [...conversation.messages, message._id];
        await conversation.save();

        updateChatHistory(conversation._id.toString());
      } else {
        const newConversation = await Conversation.create({
          messages: [message._id],
          participants: [user_id, receiverId],
        });

        updateChatHistory(newConversation._id.toString());
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const directChatHistoryHandler = async (socket: Socket, data: { receiverId: string }) => {
  try {
    const { user_id } = socket.user;

    const { receiverId } = data;

    if (user_id && receiverId) {
      const conversation = await Conversation.findOne({
        participants: { $all: [user_id, receiverId] },
      });

      if (conversation) {
        updateChatHistory(conversation._id.toString(), socket.id);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const updateChatHistory = async (
  conversationId: string,
  toSpecifiedSocketId: string | null = null,
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'author',
      model: 'User',
      select: 'username _id',
    },
  });

  if (conversation) {
    const io = getSocketServerInstance();

    if (toSpecifiedSocketId) {
      return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    conversation.participants.forEach(userId => {
      const activeConnections = getActiveConnections(userId.toString());

      activeConnections.forEach(socketId => {
        io.to(socketId).emit('direct-chat-history', {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

export { directMessageHandler, updateChatHistory, directChatHistoryHandler };
