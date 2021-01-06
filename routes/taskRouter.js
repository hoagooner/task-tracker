const router = require('express').Router()
const taskCtrl = require('../controllers/taskCtrl.js')
const auth = require('../middleware/auth')


router.route('/tasks')
    .get(taskCtrl.getTasks)
    .post(taskCtrl.createTask)

router.route('/task/:task_id')
    .delete(taskCtrl.deleteTask)
    .put(taskCtrl.updateTask)
    .get(taskCtrl.getTask)

    router.route('/task/change-status/:task_id')
    .put(taskCtrl.updateStatusTask)

module.exports = router;
