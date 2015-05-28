var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
               	  process.env.MONGOHQ_URL || 
	              "mongodb://localhost/book_app");

module.exports.User = require("./user");

module.exports.Book = require("./books");
