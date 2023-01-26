import { Op, Transaction } from 'sequelize';
import Contract from '../models/Contract';
import Profile from '../models/Profile';

class ContractRepository {
  async findById(id: number) {
    return Contract.findByPk(id);
  }

  async findByIdOrFail(id: number) {
    const contract = this.findById(id);
    if (!contract) {
      throw new Error('Contract not found');
    }
    return contract;
  }

  async findByIdAndProfile(contractId: number, profileId: number) {
    return Contract.findOne({
      where: {
        id: contractId,
        '$Contractor.id$': profileId,
      },
      include: { model: Profile, as: 'Contractor' },
    });
  }

  // This can be improved to prevent duplication
  async findAllNotTerminatedByContractor(contractorId: number) {
    return Contract.findAll({
      where: {
        status: { [Op.ne]: 'terminated' },
        '$Contractor.id$': contractorId,
      },
      include: { model: Profile, as: 'Contractor' },
    });
  }

  // This can be improved to prevent duplication
  async findAllNotTerminatedByClient(clientId: number) {
    return Contract.findAll({
      where: {
        status: { [Op.ne]: 'terminated' },
        '$Client.id$': clientId,
      },
      include: { model: Profile, as: 'Client' },
    });
  }

  async setAsTerminated(contract: Contract, transaction?: Transaction) {
    contract.status = 'terminated';
    return transaction ? contract.save({ transaction }) : contract.save();
  }
}

const contractRepository = new ContractRepository();
export default contractRepository;
