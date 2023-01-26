import { Transaction } from 'sequelize';
import Profile from '../models/Profile';
import profileRepository from '../repositories/Profiles';

class ProfileService {
  async findById(id: number) {
    return profileRepository.findById(id);
  }

  async findByIdOrFail(id: number) {
    return profileRepository.findByIdOrFail(id);
  }

  async incrementBalance(profile: Profile, amount: number, transaction?: Transaction) {
    return profileRepository.incrementBalance(profile, amount, transaction);
  }

  async decrementBalance(profile: Profile, amount: number, transaction?: Transaction) {
    return profileRepository.decrementBalance(profile, amount, transaction);
  }

  // A client can't deposit more than 25% his total of jobs to pay
  async deposit(profile: Profile, unpaidJobsAmount: number, amount: number) {
    const limit25percent = unpaidJobsAmount * 0.25;
    if (amount > limit25percent) {
      throw new Error('The amount exceeds the deposit limit');
    }
    return this.incrementBalance(profile, amount);
  }
}

const profileService = new ProfileService();
export default profileService;
