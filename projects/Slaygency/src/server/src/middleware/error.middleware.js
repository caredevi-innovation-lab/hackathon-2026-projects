// Centralized error handler for consistent API errors.
export function errorHandler(err, _req, res, next) {
  void next;
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({ message });
}
