import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MessagePopulateSchema } from '../../types/message.types';

export interface messagesStateProps {
  messages: MessagePopulateSchema[];
}

const initialState: messagesStateProps = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<MessagePopulateSchema>) => {
      const isContain = state.messages.find(
        item => JSON.stringify(item) === JSON.stringify(action.payload),
      );

      if (!isContain && action.payload) {
        state.messages = [...state.messages, action.payload];
      }
    },
    resetMessages: state => {
      state.messages = [];
    },
  },
});

export const { setMessages, resetMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
