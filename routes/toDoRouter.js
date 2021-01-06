const router = require('express').Router()
const todoCtrl = require('../controllers/toDoCtrl.js')


router.route('/todos')
    .get(todoCtrl.getToDos)
    .post(todoCtrl.createTodo)


router.route('/todo/:todo_id')
    .delete(todoCtrl.deleteToDo)
    .put(todoCtrl.updateToDo)

router.route('/todo/change-status/:todo_id')
    .put(todoCtrl.changeStatusToDo)

module.exports = router;
