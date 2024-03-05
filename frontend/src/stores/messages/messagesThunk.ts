import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatSchemaProps } from '../../types/message.types';
import handleAxiosError from '../../utils/handleAxiosError';
import { setMessages } from './messagesSlices';

const setDetailMessage = createAsyncThunk(
  'messages/setMessages',
  async (data: ChatSchemaProps, { dispatch }) => {
    try {
      if (data.messages) {
        data.messages.forEach(message => {
          dispatch(setMessages(message));
        });
      }
    } catch (error) {
      return handleAxiosError(error);
    }
  },
);

export { setDetailMessage };
