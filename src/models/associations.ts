import Contract from '../models/Contract';
import Profile from '../models/Profile';
import Job from '../models/Job';

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });

Contract.belongsTo(Profile, { as: 'Contractor' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);

Job.belongsTo(Contract);
