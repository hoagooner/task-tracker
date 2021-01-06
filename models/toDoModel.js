const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task_id: {type: String, required: true},
  title:{type: String, required: true},
  isDone: { type: Boolean, required: true },
}, {
  timestamps: true,
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;