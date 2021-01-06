const ToDos = require('../models/toDoModel')


const toDoCtrl = {
    getToDos: async (req, res) => {
        ToDos.find({ task_id: req.query.task_id })
            .sort([['_id', -1]])
            .then(todos => res.json(todos))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    createTodo: async (req, res) => {
        try {
            const { task_id, title, isDone } = req.body;

            const newTodo = new ToDos({
                task_id, title, isDone
            })

            await newTodo.save()
            res.json({ msg: "Created a todo" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteToDo: async (req, res) => {
        ToDos.findByIdAndDelete(req.params.todo_id)
            .then(() => res.json('ToDo deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    updateToDo: async (req, res) => {
        ToDos.findById(req.params.todo_id)
            .then(todo => {
                todo.task_id = req.body.task_id;
                todo.title = req.body.title;
                todo.isDone = req.body.isDone;

                todo.save()
                    .then(() => res.json('todo updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },
    changeStatusToDo: async (req, res) => {
        console.log("test change status")
        ToDos.findById(req.params.todo_id)
            .then(todo => {
                todo.isDone = !todo.isDone;

                todo.save()
                    .then(() => res.json('todo updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },
}


module.exports = toDoCtrl