import { sequelizeConnection } from '../services/Connection';
import jobRepository from '../repositories/Jobs';
import Profile from '../models/Profile';
import profileService from './Profiles';
import contractService from './Contracts';

class JobService {
  async findUnpaid(profile: Profile) {
    return profile.isClient()
      ? jobRepository.findAllUnpaidByClient(profile.id)
      : jobRepository.findAllUnpaidByContractor(profile.id);
  }

  async pay(jobId: number, client: Profile) {
    const job = await jobRepository.findUnpaidByIdWithRelations(jobId);
    if (job.paid === true) {
      throw new Error('Job already paid');
    }

    if (client.balance < job.price) {
      throw new Error('Insufficient funds');
    }

    await sequelizeConnection.transaction(async transaction => {
      try {
        const {
          Contract: { Contractor },
        } = job;
        await profileService.incrementBalance(Contractor, job.price, transaction);
        await profileService.decrementBalance(client, job.price, transaction);
        await jobRepository.setAsPaid(job, transaction);
        await contractService.setAsTerminated(job.Contract, transaction);
      } catch (error) {
        throw new Error('Error updating balances');
      }
    });

    return job;
  }
}

const jobService = new JobService();
export default jobService;
