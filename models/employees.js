import mongoose from 'mongoose';

const employeesSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const employees = mongoose.model('employees', employeesSchema);

export default employees;
