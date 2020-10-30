const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    title: {
        type: String
    },
    isGeoBased: {
        type: Boolean
    },
    location: {
        type: String
    },
    time: {
        type: Date
    },
    frequency: {
        type: String
    },
    hasParent: {
        type: Boolean
    },
    isImportant: {
        type: Boolean
    }		
},
{
    timestamps:true //this timestamp records the time of entry in the db
})

module.exports = mongoose.model("reminder", ReminderSchema);