const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required:true
    }
},
{
    timestamps:true //this timestamp records the time of entry in the db
})

module.exports = mongoose.model("note", NoteSchema);