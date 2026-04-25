import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import alertsRoutes from './routes/alertsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import patientsRoutes from './routes/patientsRoutes.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFound } from './middleware/notFound.middleware.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/alerts', alertsRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/users', userRoutes);


app.use(notFound);
app.use(errorHandler);

export default app;
