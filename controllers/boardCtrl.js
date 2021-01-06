const Boards = require('../models/BoardModel')



const boardCtrl = {
    getBoard: async (req, res) => {
        Boards.findById(req.params.board_id)
            .then(board => res.json(board))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    getBoards: async (req, res) => {
        try {
            const boards = await Boards
                .find( { members : { $elemMatch: {  user_id : req.query.user_id, accepted: true } } } )
            res.json({
                status: 'success',
                result: boards.length,
                boards: boards
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createBoard: async (req, res) => {
        try {
            const { title, description, images } = req.body;

            const board = await Boards.findOne({ title })
            if (board)
                return res.status(400).json({ msg: "This board already exists." })

            const members = [{
                user_id: req.body.user_id,
                accepted: true,
                isOwner: true
            }]

            const newBoard = new Boards({
                members, title, description, images
            })

            await newBoard.save()
            res.json({ msg: "Created a board" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteBoard: async (req, res) => {
        try {
            await Boards.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateBoard: async (req, res) => {
        try {
            const { title, description, images } = req.body;

            await Boards.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), description, images
            })

            res.json({ msg: "Updated a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    inviteMember: async (req, res) => {
        try {
            const newMember =
            {
                user_id: req.body._id,
                accepted: false,
                isOwner: false
            }
            console.log(req.body._id)

            const Board = await Boards.findOne({ "members.user_id": req.body._id, _id: req.params.id})
            console.log(Board)
            if (Board) return res.status(400).json({ msg: "Member exist." })

            await Boards.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { members: newMember } }
            )
            res.json({ msg: "Updated a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    accept: async (req, res) => {
        try {
            console.log(req.body.user_id)
            console.log("here")
            // const Board = await Boards.findOne({ "members.user_id": req.body._id, _id: req.params.id})
            // if (Board) return res.status(400).json({ msg: "Member exist." })

            await Boards.update(
                { "members.user_id": req.body.user_id, _id: req.params.id},
                {'$set': {
                    'members.$.accepted': true,
                }}
            )
            res.json({ msg: "Updated a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    reject: async (req, res) => {
        try {
            console.log(req.body.user_id)
            console.log("here")
            // const Board = await Boards.findOne({ "members.user_id": req.body._id, _id: req.params.id})
            // if (Board) return res.status(400).json({ msg: "Member exist." })

            await Boards.update(
                { "members.user_id": req.body.user_id, _id: req.params.id},
                {'$set': {
                    'members.$.accepted': true,
                }}
            )
            res.json({ msg: "Updated a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    removeMember: async (req, res) => {
        try {
            await Boards.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { members: { user_id: req.body.user_id  } }}
            )
            res.json({ msg: "Updated a Board" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getInviteBoards: async (req, res) => {
        try {
            const boards = await Boards
            .find( { members : { $elemMatch: {  user_id : req.query.user_id, accepted: false } } } )
            res.json({
                status: 'success',
                result: boards.length,
                boards: boards
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}


module.exports = boardCtrl