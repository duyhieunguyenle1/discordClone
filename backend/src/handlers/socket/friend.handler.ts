import Friend from '../../models/friend.model';
import User from '../../models/user.model';
import { IFriendPopulate, IFriendUser } from '../../types/friend.types';
import { getActiveConnections, getSocketServerInstance } from './serverStore';

const updatePendingInvitations = async (userId: string) => {
  try {
    const receiverLists = getActiveConnections(userId);

    if (receiverLists.length > 0) {
      const pendingInvitations = await Friend.find({ receiverId: userId }).populate(
        'senderId',
        '_id username email img',
      );

      const io = getSocketServerInstance();

      receiverLists.forEach(receiverId => {
        io.to(receiverId).emit('friends-invitations', {
          pendingFriendInvitations: pendingInvitations ? pendingInvitations : [],
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateFriends = async (userId: string) => {
  try {
    const receiverLists = getActiveConnections(userId);

    if (receiverLists.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate<IFriendPopulate>(
        'friends',
        '_id username email img',
      );

      if (user) {
        const friendsList = user.friends.map((f: IFriendUser) => {
          return {
            id: f._id,
            email: f.email,
            username: f.username,
            img: f?.img || '',
          };
        });

        const io = getSocketServerInstance();

        receiverLists.forEach(receiverId => {
          io.to(receiverId).emit('friends-list', {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export { updatePendingInvitations, updateFriends };
