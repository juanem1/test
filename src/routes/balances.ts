import express, { Request, Response } from 'express';
import onlyClients from '../middleware/onlyClients';
import jobService from '../services/Jobs';
import profileService from '../services/Profiles';

const router = express.Router();

/**
 * I am not using the "userId" parameter on purpose, since
 * a logged in user will send his ID in the request headers
 * Payload:
 * {
 *   "amount": 500
 * }
 */
router.post('/deposit/:userId', onlyClients, async (req: Request, res: Response) => {
  const { amount } = req.body;
  // This can be improved returning the total unpaid amount from the DB
  const jobs = await jobService.findUnpaid(req.profile);
  const unpaidJobsAmount = jobs.reduce((prev, curr) => {
    return prev + curr.price;
  }, 0);
  try {
    await profileService.deposit(req.profile, unpaidJobsAmount, amount);
    res.json({ message: 'Deposit successfully added' });
  } catch (error) {
    return res.status(400).json({ message: error.message }).end();
  }
});

export default router;
