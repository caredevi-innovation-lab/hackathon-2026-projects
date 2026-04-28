/**
 * Notification service placeholder.
 * In production, this would integrate with email, SMS, or push notification providers
 * to alert healthcare workers about high-risk patients.
 *
 * For the hackathon MVP, notifications are handled via the Alert model
 * and displayed in the dashboard UI.
 */

// eslint-disable-next-line no-console
export async function notifyHighRisk({ patient, alert }) {
  console.log(`[notify] High-risk alert for patient ${patient?.name || 'unknown'}:`, alert?.message);
  // TODO: integrate with SMS/email provider for production
  return { sent: false, reason: 'notification-service-not-configured' };
}
