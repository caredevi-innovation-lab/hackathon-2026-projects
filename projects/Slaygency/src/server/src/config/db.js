import mongoose from 'mongoose';

export async function connectDB() {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  await mongoose.connect(mongoURI);
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
}
