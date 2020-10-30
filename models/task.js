const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    dateTime: {
        type: Date,
    },
    type: {
        type: String,
    },
    priority: {
        type: Number,
    },
    recurrant: {
        type: Boolean,
    },
    status: {
        type: String,
        enum: [ "Do it now", "Schedule it", "Deligate", "Neglect it"],//pre-defined status
        required: true,
    },
    subtasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'task'
        }
    ],
    notes:[
        {
            type:mongoose.Types.ObjectId,
            ref: 'note'
        }
    ],
    isImportant: {
        type: Boolean,
        required: true
    }		
},
{
    timestamps:true //this timestamp records the time of entry in the db
})

module.exports = mongoose.model("task", TaskSchema);