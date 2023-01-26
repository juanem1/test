import express from 'express';
import request from 'supertest';
import authorize from '../src/middleware/authorize';
import getProfile from '../src/middleware/getProfile';
import contractRoutes from '../src/routes/contracts';
import { seed } from '../src/seeders/all';

const app = express();
app.use(authorize);
app.use(getProfile);
app.use('/contracts', contractRoutes);

describe('Contract routes', () => {
  beforeEach(async () => {
    await seed();
  });

  it('should return all contracts for a client profile', async () => {
    const { body } = await request(app)
      .get('/contracts')
      .set('profile_id', '1');

    expect(body.length).toEqual(1);
    const [firstContract] = body;
    expect(firstContract.id).toBe(2);
    expect(firstContract.status).toBe('in_progress');
  });

  it('should return only non terminated contracts', async () => {
    const { body } = await request(app)
      .get('/contracts')
      .set('profile_id', '1');

    body.forEach(contract => {
      expect(contract.status).not.toBe('terminated');
    });
  });

  it('should return all contracts for a contractor profile', async () => {
    const { body } = await request(app)
      .get('/contracts')
      .set('profile_id', '6');

    expect(body.length).toEqual(3);
    const [firstContract] = body;
    expect(firstContract.id).toBe(2);
    expect(firstContract.status).toBe('in_progress');
  });

  it('should return one contract by its ID', async () => {
    const { body } = await request(app)
      .get('/contracts/5')
      .set('profile_id', '8');

    expect(body.id).toBe(5);
    expect(body.ContractorId).toBe(8);
  });
});
