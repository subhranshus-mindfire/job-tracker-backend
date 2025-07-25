import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURL = process.env.MONGO_URL || `mongodb+srv://subhranshumfs:${process.env.DB_PASSWORD}@cluster0.jebf9ua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
l`;
    console.log(`Connecting to MongoDB: ${mongoURL}`);

    await mongoose.connect(mongoURL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    process.exit(1);
  }
};
