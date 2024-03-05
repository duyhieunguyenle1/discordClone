interface ContentSchema {
  content: string;
  img?: string;
}

interface ContentSocket extends ContentSchema {
  receiverId: string;
}

interface MessagePopulateSchema {
  author: {
    _id: string;
    username: string;
  };
  content: string;
  createdAt: Date;
  type: string;
  updatedAt: Date;
  _id: string;
  img?: string;
}

interface ChatSchemaProps {
  messages: MessagePopulateSchema[];
  participants: string[];
}

export type { ContentSchema, ContentSocket, ChatSchemaProps, MessagePopulateSchema };
