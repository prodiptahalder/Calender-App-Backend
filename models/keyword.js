const mongoose = require('mongoose');

const KeywordSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model("keyword", KeywordSchema);