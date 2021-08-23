const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    disc : {
        type : String,
        required : true
    },
    createAt : {
        type : Date,
        default : Date.now
    },
    complite:{
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model("Todo",todoSchema)