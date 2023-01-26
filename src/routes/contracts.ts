import express, { Request, Response } from 'express';
import contractService from '../services/Contracts';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const contracts = await contractService.findAllNotTerminated(req.profile);
    res.json(contracts);
  } catch (error) {
    return res.status(404).end();
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const profile = req.profile;
  try {
    const contract = await contractService.findByIdAndProfile(Number(id), profile.id);
    res.json(contract);
  } catch (error) {
    return res.status(404).end();
  }
});

export default router;
