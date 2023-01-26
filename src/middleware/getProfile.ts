import { Request, Response, NextFunction } from 'express';
import profileService from '../services/Profiles';

export default async function getProfile(req: Request, res: Response, next: NextFunction) {
  if (req.profileId === 0) {
    return res.status(401).end();
  } else {
    try {
      const profile = await profileService.findByIdOrFail(req.profileId);
      req.profile = profile;
    } catch (error) {
      return res.status(401).end();
    }
  }
  next();
}
