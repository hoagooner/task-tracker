const mongoose = require('mongoose')


const boardSchema = new mongoose.Schema({
    // user_id:{
    //     type:String
    // },
    // members:[
    //     {
    //         user_id:String,
    //         accepted: Boolean 
    //     }
    // ],
    members: {
        type: Array,
        default: []
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    task: {
        type: Array,
        default: []
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Boards", boardSchema)