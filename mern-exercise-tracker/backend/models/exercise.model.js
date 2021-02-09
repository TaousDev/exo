const mongoose = require('mongoose')

const Schema = mongoose.Schema

const exerciseSchema = new Schema({
    username: {
        type: String,
    }, 
    desc: {
        type: String,
    },
    duration: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false
    }
}, {
        timestamps: true
}  
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;