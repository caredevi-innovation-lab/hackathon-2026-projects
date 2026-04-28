import { Alert } from '../models/Alert.js';
import { HealthRecord } from '../models/HealthRecord.js';
import { USER_ROLES, User } from '../models/User.js';

export async function getDashboardStats(req, res, next) {
  try {
    // Run all queries in parallel for performance
    const [
      totalPatients,
      highRiskCount,
      totalRecords,
      recentAlerts,
      recentPatients,
    ] = await Promise.all([
      // Total active patients
      User.countDocuments({ role: USER_ROLES.PATIENT, isActive: true }),

      // Active high-risk alerts
      Alert.countDocuments({ status: 'active' }),

      // Total health records (pending reports = records without follow-up)
      HealthRecord.countDocuments(),

      // Latest 4 active alerts for the urgent priority queue
      Alert.find({ status: 'active' })
        .sort({ createdAt: -1 })
        .limit(4)
        .populate('patient', 'name email phone')
        .populate('healthRecord'),

      // Recently added patients
      User.find({ role: USER_ROLES.PATIENT, isActive: true })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email phone createdAt'),
    ]);

    // Format urgent alerts for frontend consumption
    const urgentAlerts = recentAlerts.map((alert) => ({
      id: alert._id,
      patientName: alert.patient?.name || 'Unknown Patient',
      patientId: alert.patient?._id,
      patientEmail: alert.patient?.email,
      source: alert.source,
      priority: alert.priority,
      status: alert.status,
      reasons: alert.reasons,
      message: alert.message,
      createdAt: alert.createdAt,
      healthRecord: alert.healthRecord
        ? {
            id: alert.healthRecord._id,
            systolicBP: alert.healthRecord.systolicBP,
            diastolicBP: alert.healthRecord.diastolicBP,
            hemoglobin: alert.healthRecord.hemoglobin,
            symptoms: alert.healthRecord.symptoms,
          }
        : null,
    }));

    return res.json({
      stats: {
        totalPatients,
        highRiskCount,
        pendingReports: Math.max(0, totalRecords - highRiskCount),
        avgResponseTime: '4.2m', // placeholder — needs appointment tracking
      },
      urgentAlerts,
      recentPatients: recentPatients.map((p) => ({
        id: p._id,
        name: p.name,
        email: p.email,
        phone: p.phone,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    return next(error);
  }
}
