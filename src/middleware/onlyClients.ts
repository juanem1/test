import { Request, Response, NextFunction } from 'express';

// Allow access only for clients
export default function onlyClients(req: Request, res: Response, next: NextFunction) {
  if (!req.profile.isClient()) {
    return res.status(401).end();
  }
  next();
}
