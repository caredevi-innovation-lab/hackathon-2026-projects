import mongoose from 'mongoose';

export async function connectDB() {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/slaygency';

  if (!process.env.MONGODB_URI) {
    // eslint-disable-next-line no-console
    console.warn(
      '[startup] MONGODB_URI not set. Falling back to mongodb://127.0.0.1:27017/slaygency'
    );
  }

  await mongoose.connect(mongoURI);
  // eslint-disable-next-line no-console
  console.log('MongoDB connected');
}
