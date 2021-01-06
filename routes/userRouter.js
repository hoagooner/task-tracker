const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/logout', userCtrl.logout)

router.get('/refresh_token', userCtrl.refreshToken)

router.get('/infor', auth,  userCtrl.getUser)

router.get('/home', auth, userCtrl.getUser)

router.get('/user/:id', userCtrl.findUser)

router.get('/users/:id',  userCtrl.getUsers)

router.get('/accounts',  userCtrl.getUsers)

router.post('/user-email',  userCtrl.getUserByEmail)
        
router.delete('/delete',  userCtrl.delete)

module.exports = router