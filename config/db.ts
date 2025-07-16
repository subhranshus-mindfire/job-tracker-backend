import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/job_portal';
    console.log(`Connecting to MongoDB: ${mongoURL}`);

    await mongoose.connect(mongoURL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    process.exit(1);
  }
};
