import { Transaction } from 'sequelize';
import Contract from '../models/Contract';
import Profile from '../models/Profile';
import contractRepository from '../repositories/Contracts';

class ContractService {
  async findByIdAndProfile(contractId: number, profileId: number) {
    return contractRepository.findByIdAndProfile(contractId, profileId);
  }

  async findAllNotTerminated(profile: Profile) {
    return profile.isClient()
      ? contractRepository.findAllNotTerminatedByClient(profile.id)
      : contractRepository.findAllNotTerminatedByContractor(profile.id);
  }

  async setAsTerminated(contract: Contract, transaction?: Transaction) {
    return contractRepository.setAsTerminated(contract, transaction);
  }
}

const contractService = new ContractService();
export default contractService;
