import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb+srv://subhranshumfs:White1947@cluster0.jebf9ua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    process.exit(1);
  }
};
