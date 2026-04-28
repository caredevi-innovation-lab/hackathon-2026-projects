import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const PORT = process.env.PORT || 5000;

async function bootstrapAccess() {
  return Promise.resolve();
}

async function seedCategories() {
  return Promise.resolve();
}

connectDB()
  .then(() => {
    bootstrapAccess().catch((err) =>
      // eslint-disable-next-line no-console
      console.warn('[startup] access bootstrap failed', err)
    );
    seedCategories().catch((err) =>
      // eslint-disable-next-line no-console
      console.warn('[startup] category seed failed', err)
    );
  })
  .catch((err) =>
    // eslint-disable-next-line no-console
    console.error('[startup] DB connection failed', err)
  );

app.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
