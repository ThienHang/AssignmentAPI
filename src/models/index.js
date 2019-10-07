import mongoose from 'mongoose';

import User from './user';
import employees from './employees';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, employees };

export { connectDb };

export default models;
