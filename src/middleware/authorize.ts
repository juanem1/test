import { Request, Response, NextFunction } from 'express';
import { isValidId } from '../utils/strings';

export default function authorize(req: Request, res: Response, next: NextFunction) {
  const strProfileId = req.get('profile_id');
  if (!strProfileId || !isValidId(strProfileId)) {
    return res.status(401).end();
  }
  req.profileId = Number(strProfileId);
  next();
}
