/**
 * Create an Error object with an HTTP status code.
 * Used across services so controllers/middleware can read `err.status`.
 */
export function createHttpError(message, status) {
  const error = new Error(message);
  error.status = status;
  return error;
}
