const {connection, Schema} = require('mongoose');

const BookSchema = new Schema({
     title : String,
     isbn: String,
     pageCount: Number,
     publishedDate: Date,
     thumbnailUrl: String,
     status: String,
     shortDescription: String,
     longDescription: String,
     authors: [{
        type: String
     }],
     categories: [{
       type: String
     }]
});

module.exports = connection.model('books', BookSchema);
