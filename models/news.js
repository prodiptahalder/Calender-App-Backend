const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String
    },
    source: {
        type: String
    },
    authorImage: {
        type: String
    },
    content: {
        data: Buffer,
        contentType: String
    },
    keywords: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'keyword'
        },
      ],
},
{
    timestamps:true //this timestamp records the time of entry in the db
})

module.exports = mongoose.model("news", NewsSchema);