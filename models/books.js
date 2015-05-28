
var mongoose = require("mongoose");

var bookSchema = new mongoose.Schema({
               
                 book_name: {
                    type: String,
                    default: ""
                  },
                  author_name: {
                    type: String,
                    default: ""
                  }
                });


var Book = mongoose.model("Book", bookSchema);

module.exports = Book;

