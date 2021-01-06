const router = require('express').Router()
const boardCtrl = require('../controllers/boardCtrl.js')
const auth = require('../middleware/auth')


router.route('/boards')
    .get(boardCtrl.getBoards)
    .post(auth, boardCtrl.createBoard)

router.route('/board/:board_id')
    .get(boardCtrl.getBoard)

// router.route('/acceptedMember/:board_id').get(boardCtrl.getAcceptedMember)

router.route('/boards/:id')
    .delete(auth, boardCtrl.deleteBoard)
    .put(auth, boardCtrl.updateBoard)

router.route('/board/invite-member/:id').put(boardCtrl.inviteMember)
router.route('/board/remove-member/:id').put(boardCtrl.removeMember)
router.route('/board/accept/:id').put(boardCtrl.accept)
router.route('/board/reject/:id').put(boardCtrl.reject)


router.route('/inviteBoards').get(boardCtrl.getInviteBoards)


module.exports = router