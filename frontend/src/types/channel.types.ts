enum ChannelType {
  TEXT = 'Text',
  VIDEO = 'Video',
  AUDIO = 'Audio',
}

interface ChannelProps {
  _id: string;
  server: string;
  name: string;
  type: string;
}

export type { ChannelProps };
export { ChannelType };
