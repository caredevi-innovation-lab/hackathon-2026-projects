import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User, USER_ROLES } from './models/User.js';
import { HealthRecord } from './models/HealthRecord.js';
import { createConditionAlertFromRecord } from './controllers/alertController.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.error('MONGODB_URI not set in .env');
  process.exit(1);
}

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB for seeding...');

  // ── Doctor ──
  const doctorEmail = 'dr.sharma@maternova.com';
  let doctor = await User.findOne({ email: doctorEmail });
  if (!doctor) {
    doctor = await User.create({
      name: 'Dr. Sharma',
      email: doctorEmail,
      passwordHash: await bcrypt.hash('password123', 10),
      role: USER_ROLES.DOCTOR,
      phone: '+977-9841000001',
    });
    console.log('✅ Doctor created:', doctor.email);
  } else {
    console.log('ℹ️  Doctor already exists:', doctor.email);
  }

  // ── Patients ──
  const patientData = [
    { name: 'Anisha Thapa', email: 'anisha@example.com', phone: '+977-9841000010' },
    { name: 'Sunita Gurung', email: 'sunita@example.com', phone: '+977-9841000011' },
    { name: 'Priyanka Pariyar', email: 'priyanka@example.com', phone: '+977-9841000012' },
    { name: 'Maya Devi', email: 'maya@example.com', phone: '+977-9841000013' },
    { name: 'Deepa Shrestha', email: 'deepa@example.com', phone: '+977-9841000014' },
    { name: 'Anjali Sharma', email: 'anjali@example.com', phone: '+977-9841000015' },
    { name: 'Sita Rai', email: 'sita@example.com', phone: '+977-9841000016' },
    { name: 'Kamala Bhandari', email: 'kamala@example.com', phone: '+977-9841000017' },
  ];

  const patients = [];
  for (const pd of patientData) {
    let patient = await User.findOne({ email: pd.email });
    if (!patient) {
      patient = await User.create({
        name: pd.name,
        email: pd.email,
        passwordHash: await bcrypt.hash('patient123', 10),
        role: USER_ROLES.PATIENT,
        phone: pd.phone,
      });
      console.log('✅ Patient created:', patient.name);
    } else {
      console.log('ℹ️  Patient exists:', patient.name);
    }
    patients.push(patient);
  }

  // ── Health Records (some high-risk) ──
  const recordData = [
    // High-risk records (elevated BP or low hemoglobin)
    { patientIdx: 0, age: 28, systolicBP: 148, diastolicBP: 96, hemoglobin: 9.5, symptoms: ['severe headache', 'swelling'] },
    { patientIdx: 3, age: 32, systolicBP: 155, diastolicBP: 100, hemoglobin: 8.2, symptoms: ['blurred vision', 'headache'] },
    { patientIdx: 5, age: 24, systolicBP: 142, diastolicBP: 92, hemoglobin: 10.5, symptoms: ['swelling'] },
    // Normal records
    { patientIdx: 1, age: 22, systolicBP: 118, diastolicBP: 78, hemoglobin: 12.5, symptoms: [] },
    { patientIdx: 2, age: 26, systolicBP: 125, diastolicBP: 82, hemoglobin: 11.8, symptoms: ['fatigue'] },
    { patientIdx: 4, age: 30, systolicBP: 115, diastolicBP: 75, hemoglobin: 13.2, symptoms: [] },
    { patientIdx: 6, age: 27, systolicBP: 120, diastolicBP: 80, hemoglobin: 12.0, symptoms: [] },
    { patientIdx: 7, age: 35, systolicBP: 130, diastolicBP: 85, hemoglobin: 11.0, symptoms: ['nausea'] },
  ];

  for (const rd of recordData) {
    const patient = patients[rd.patientIdx];
    const existingRecord = await HealthRecord.findOne({ user: patient._id });
    if (!existingRecord) {
      const record = await HealthRecord.create({
        user: patient._id,
        age: rd.age,
        systolicBP: rd.systolicBP,
        diastolicBP: rd.diastolicBP,
        hemoglobin: rd.hemoglobin,
        symptoms: rd.symptoms,
        pregnancyHistory: 'First pregnancy',
      });
      console.log(`✅ Health record created for ${patient.name} (BP: ${rd.systolicBP}/${rd.diastolicBP})`);

      // Auto-create alerts for high-risk records
      const alert = await createConditionAlertFromRecord({
        healthRecord: record,
        actorId: doctor._id,
      });
      if (alert) {
        console.log(`🚨 Alert auto-created for ${patient.name}: ${alert.reasons.join(', ')}`);
      }
    } else {
      console.log(`ℹ️  Health record exists for ${patient.name}`);
    }
  }

  console.log('\n🎉 Seed complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Doctor login credentials:');
  console.log(`  Email:    ${doctorEmail}`);
  console.log('  Password: password123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
