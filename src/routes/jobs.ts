import express, { Request, Response } from 'express';
import onlyClients from '../middleware/onlyClients';
import jobService from '../services/Jobs';
import { isValidId } from '../utils/strings';

const router = express.Router();

router.get('/unpaid', async (req: Request, res: Response) => {
  try {
    const jobs = await jobService.findUnpaid(req.profile);
    res.json(jobs);
  } catch (error) {
    return res.status(404).end();
  }
});

router.post('/:jobId/pay', onlyClients, async (req: Request, res: Response) => {
  const { jobId } = req.params;

  if (!isValidId(jobId)) {
    return res.status(400).json({ message: 'Invalid job id' }).end();
  }

  try {
    const job = await jobService.pay(Number(jobId), req.profile);
    res.json(job);
  } catch (error) {
    return res.status(400).json({ message: error.message }).end();
  }
});

export default router;
