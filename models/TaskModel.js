const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  user_id: { type: String, required: false},
  board_id: {type: String, required: true},
  title:{type: String, required: true},
  description: { type: String, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false },
  status: { type: String, required: false },
  priority: { type: String, required: false },
}, {
  timestamps: true,
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;