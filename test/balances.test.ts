import express from 'express';
import request from 'supertest';
import bodyParser from 'body-parser';
import authorize from '../src/middleware/authorize';
import getProfile from '../src/middleware/getProfile';
import balanceRoutes from '../src/routes/balances';
import { seed } from '../src/seeders/all';

const app = express();
app.use(bodyParser.json());
app.use(authorize);
app.use(getProfile);
app.use('/balances', balanceRoutes);

describe('Balance routes', () => {
  beforeEach(async () => {
    await seed();
  });

  it('should return an error if I try to deposit more than 25%', async () => {
    const { body } = await request(app)
      .post('/balances/deposit/1')
      .send({ amount: 1000 })
      .set('profile_id', '1')
      .expect(400);

    expect(body.message).toBe('The amount exceeds the deposit limit');
  });

  it('should deposit money into the user account', async () => {
    const { body } = await request(app)
      .post('/balances/deposit/1')
      .send({ amount: 100 })
      .set('profile_id', '1')
      .expect(200);

    expect(body.message).toBe('Deposit successfully added');
  });
});
