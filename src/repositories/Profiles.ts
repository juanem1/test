import { Transaction } from 'sequelize';
import Profile from '../models/Profile';

class ProfileRepository {
  async findById(id: number) {
    return Profile.findByPk(id);
  }

  async findByIdOrFail(id: number) {
    const contract = this.findById(id);
    if (!contract) {
      throw new Error('Contract not found');
    }
    return contract;
  }

  async incrementBalance(profile: Profile, amount: number, transaction?: Transaction) {
    profile.balance = profile.balance + amount;
    return transaction ? profile.save({ transaction }) : profile.save();
  }

  async decrementBalance(profile: Profile, amount: number, transaction?: Transaction) {
    profile.balance = profile.balance - amount;
    return transaction ? profile.save({ transaction }) : profile.save();
  }
}

const profileRepository = new ProfileRepository();
export default profileRepository;
