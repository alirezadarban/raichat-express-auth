import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/express-auth');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
