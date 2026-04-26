import assert from 'node:assert/strict';
import test from 'node:test';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../src/app.js';
import { User } from '../src/models/User.js';

const JWT_SECRET = 'test-secret';
let mongoServer;
let originalFetch;

async function createAuthenticatedUser() {
  const passwordHash = await bcrypt.hash('password123', 10);
  const user = await User.create({
    name: 'Risk Tester',
    email: `risk-${Date.now()}-${Math.random()}@example.com`,
    passwordHash,
    role: 'Doctor',
    isActive: true,
  });

  const token = jwt.sign({ sub: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
}

test.before(async () => {
  process.env.JWT_SECRET = JWT_SECRET;
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  originalFetch = global.fetch;
});

test.after(async () => {
  global.fetch = originalFetch;
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

test.beforeEach(async () => {
  await User.deleteMany({});
});

test('risk health endpoint rejects unauthenticated requests', async () => {
  const response = await request(app).get('/api/risk/health');

  assert.equal(response.status, 401);
  assert.equal(response.body.message, 'Unauthorized');
});

test('risk health endpoint returns ai service health for authenticated user', async () => {
  const { token } = await createAuthenticatedUser();

  global.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ status: 'healthy', model: 'xgboost' }),
  });

  const response = await request(app)
    .get('/api/risk/health')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.aiService.status, 'healthy');
});

test('risk predict endpoint validates request payload before calling ai', async () => {
  const { token } = await createAuthenticatedUser();
  let fetchCalled = false;

  global.fetch = async () => {
    fetchCalled = true;
    return {
      ok: true,
      status: 200,
      json: async () => ({}),
    };
  };

  const response = await request(app)
    .post('/api/risk/predict')
    .set('Authorization', `Bearer ${token}`)
    .send({
      age: 5,
      bpSystolic: 120,
      bpDiastolic: 80,
      hemoglobin: 11,
      symptoms: [],
    });

  assert.equal(response.status, 400);
  assert.equal(response.body.message, 'Age must be between 10 and 60');
  assert.equal(fetchCalled, false);
});

test('risk predict endpoint returns ai prediction for valid payload', async () => {
  const { token } = await createAuthenticatedUser();

  global.fetch = async (url, options) => {
    if (!url.endsWith('/predict')) {
      return {
        ok: false,
        status: 404,
        json: async () => ({ detail: 'Not found' }),
      };
    }

    const requestBody = JSON.parse(options.body);
    assert.equal(typeof requestBody.systolic_bp, 'number');
    assert.equal(requestBody.prev_complications, 1);

    return {
      ok: true,
      status: 200,
      json: async () => ({
        success: true,
        risk_level: 2,
        risk_label: 'High Risk',
        risk_score: 86.3,
      }),
    };
  };

  const response = await request(app)
    .post('/api/risk/predict')
    .set('Authorization', `Bearer ${token}`)
    .send({
      age: 29,
      bpSystolic: 150,
      bpDiastolic: 92,
      hemoglobin: 9.8,
      symptoms: ['headache', 'swelling'],
      priorHypertension: true,
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.prediction.success, true);
  assert.equal(response.body.prediction.risk_level, 2);
});
