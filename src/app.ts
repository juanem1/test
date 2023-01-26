import express from 'express';
import bodyParser from 'body-parser';
import './models/associations';

import authorize from './middleware/authorize';
import getProfile from './middleware/getProfile';

import contractRoutes from './routes/contracts';
import jobsRoutes from './routes/jobs';
import balanceRoutes from './routes/balances';

const app = express();

app.use(bodyParser.json());
app.use(authorize);
app.use(getProfile);

app.use('/contracts', contractRoutes);
app.use('/jobs', jobsRoutes);
app.use('/balances', balanceRoutes);

export default app;
