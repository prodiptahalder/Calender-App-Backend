const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    quote: {
        type: String,
        // required: true
    },
    background: {
        type: String,
        // required: true
    },
    priority: {
        type: Number,
        required: true
    },
    recurrant: {
        type: Boolean,
    }
    
},
{
    timestamps:true //this timestamp records the time of entry in the db
})

module.exports = mongoose.model("goal", GoalSchema);