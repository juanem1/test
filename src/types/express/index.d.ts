import Profile from '../../models/Profile';

// Avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      profileId: number;
      profile: Profile;
    }
  }
}
