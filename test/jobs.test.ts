import express from 'express';
import request from 'supertest';
import authorize from '../src/middleware/authorize';
import getProfile from '../src/middleware/getProfile';
import jobsRoutes from '../src/routes/jobs';
import { seed } from '../src/seeders/all';

const app = express();
app.use(authorize);
app.use(getProfile);
app.use('/jobs', jobsRoutes);

describe('Jobs routes', () => {
  beforeEach(async () => {
    await seed();
  });

  it('Get all unpaid jobs for a client', async () => {
    const { body } = await request(app)
      .get('/jobs/unpaid')
      .set('profile_id', '2');

    expect(body.length).toEqual(2);
    const [firstContract] = body;
    expect(firstContract.id).toBe(3);
    expect(firstContract.paid).toBe(false);
  });

  it('Get all unpaid jobs for a contractor', async () => {
    const { body } = await request(app)
      .get('/jobs/unpaid')
      .set('profile_id', '6');

    expect(body.length).toEqual(2);
    const [firstContract] = body;
    expect(firstContract.id).toBe(2);
    expect(firstContract.paid).toBe(false);
  });

  it('should pay one job', async () => {
    const { body } = await request(app)
      .post('/jobs/2/pay')
      .set('profile_id', '1');

    expect(body.id).toBe(2);
    expect(body.paid).toBe(true);
  });

  it('should return an error if the job ID is invalid', async () => {
    const { body } = await request(app)
      .post('/jobs/zz+/pay')
      .set('profile_id', '1')
      .expect(400);

    expect(body.message).toBe('Invalid job id');
  });

  it('should return an error if the job is already paid', async () => {
    await request(app)
      .post('/jobs/2/pay')
      .set('profile_id', '1');

    const { body } = await request(app)
      .post('/jobs/2/pay')
      .set('profile_id', '1')
      .expect(400);

    expect(body.message).toBe('Job already paid');
  });
});
