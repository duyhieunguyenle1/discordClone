import mongoose from 'mongoose';

const connectDB = async (url: string) => {
  return mongoose
    .connect(url)
    .then(con => {
      console.log(`MongoDB Database connected with HOST:${con.connection.host}`);
    })
    .catch(error => console.log(`MongoDB Database error: ${error}`));
};

export default connectDB;
