const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        // required: true
    },
    endDate: {
        type: Date,
        // required: true
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
        type: String,
        enum: ["High", "Medium", "Low"],
        required: true
    },
    recurrant: {
        type: Boolean,
    },
    recurrantPeriod: {
        type: String,
        enum: ["Daily", "Weekly", "Monthly", "None"]
    },
    invite:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'user'
        }
    ],
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
},
{
    timestamps:true //this timestamp records the time of entry in the db
})

module.exports = mongoose.model("goal", GoalSchema);