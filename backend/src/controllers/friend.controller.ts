import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model';
import Friend from '../models/friend.model';
import { updateFriends, updatePendingInvitations } from '../handlers/socket/friend.handler';

const sendInvite = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const { user_id, email: userEmail } = req.user;

  if (!email) {
    return next(createHttpError.NotFound('Please enter an email'));
  }

  if (email === userEmail) {
    return next(createHttpError.Conflict('Cant send request to yourself'));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(createHttpError.NotFound('User not found, please enter existed email'));
  }

  const invitationAlreadyExist = await Friend.findOne({
    receiverId: user?._id,
    senderId: user_id,
  });

  if (invitationAlreadyExist) {
    return next(createHttpError.NotAcceptable('Request has already sent'));
  }

  const userAlreadyFriend = user?.friends.find(f => f.toString() === user_id.toString());

  if (userAlreadyFriend) {
    return next(createHttpError.NotAcceptable('You guys are already friends'));
  }

  const newInvitation = await Friend.create({
    senderId: user_id,
    receiverId: user?._id,
  });

  updatePendingInvitations(user._id.toString());

  return res.status(StatusCodes.CREATED).json({ msg: 'Sent request successfully' });
};

const acceptInvite = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  const friendInvitation = await Friend.findOne({ _id: id });

  if (!friendInvitation) {
    return next(createHttpError.NotFound('Not found friend invitation!'));
  }

  const { senderId, receiverId } = friendInvitation;

  const user1 = await User.findById(senderId);
  const user2 = await User.findById(receiverId);

  if (user1 && user2) {
    user1.friends = [...user1.friends, receiverId];
    user2.friends = [...user2.friends, senderId];

    await user1.save();
    await user2.save();
  }

  await Friend.findByIdAndDelete(id);

  await updateFriends(receiverId.toString());
  await updateFriends(senderId.toString());

  await updatePendingInvitations(receiverId.toString());

  return res.status(StatusCodes.OK).json({ msg: 'Invitation accepted successfully' });
};

const rejectInvite = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  const { user_id } = req.user;

  const friendInvitation = await Friend.findOne({ _id: id });

  if (!friendInvitation) {
    return next(createHttpError.NotFound('Not found friend invitation!'));
  }

  await Friend.findByIdAndDelete(id);

  updatePendingInvitations(user_id.toString());

  return res.status(StatusCodes.OK).json({ msg: 'Invitation rejected successfully' });
};

export { sendInvite, acceptInvite, rejectInvite };
