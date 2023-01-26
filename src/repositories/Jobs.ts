import { Transaction } from 'sequelize';
import Contract from '../models/Contract';
import Job from '../models/Job';
import Profile from '../models/Profile';

class JobRepository {
  async findById(id: number) {
    return Job.findByPk(id);
  }

  async findByIdOrFail(id: number) {
    const job = this.findById(id);
    if (!job) {
      throw new Error('Job not found');
    }
    return job;
  }

  /**
   * Create where condition for a client or a contractor
   */
  private findAllUnpaid(type: string, id: number) {
    return {
      where: {
        paid: 0,
        [`$Contract.${type}$`]: id,
      },
      include: { model: Contract },
    };
  }

  async findAllUnpaidByContractor(contractorId: number) {
    return Job.findAll(this.findAllUnpaid('contractorId', contractorId));
  }

  async findAllUnpaidByClient(clientId: number) {
    return Job.findAll(this.findAllUnpaid('clientId', clientId));
  }

  async findUnpaidByIdWithRelations(jobId: number) {
    return Job.findOne({
      where: {
        id: jobId,
      },
      include: {
        model: Contract,
        include: [{ model: Profile, as: 'Contractor' }],
      },
    });
  }

  async setAsPaid(job: Job, transaction: Transaction) {
    job.paid = true;
    job.paymentDate = new Date();
    return job.save({ transaction });
  }
}

const jobRepository = new JobRepository();
export default jobRepository;
