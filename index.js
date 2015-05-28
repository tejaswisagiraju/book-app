var express = require("express"),
    bodyParser = require("body-parser"),
    path = require("path"),
    db = require("./models"),
    session = require("express-session");

var app = express();
app.use('/bower_components', express.static(path.join(__dirname,'/bower_components')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({extended: true }));

var views = path.join(__dirname, "views");

app.use(session({
  secret: "SUPER STUFF",
  resave: false,
  saveUninitialized: true
}));

app.use("/", function (req, res, next) {

  req.login = function (user) {
    req.session.userId = user._id;
  };

  req.currentUser = function (cb) {
     db.User.
      findOne({
          _id: req.session.userId
      },
      function (err, user) {
        req.user = user;
        cb(null, user);
      })
  };

  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }

  next(); 
});


app.get("/", function (req, res) {
  var homePath = path.join(views, "home.html");
  res.sendFile(homePath);
});


app.post("/", function (req, res) {
  var user = req.body.user;

  db.User.authenticate(user, function (err, user) {
  	console.log(user);
  	console.log(err);
    if (!err) {
    req.login(user);
      res.redirect("/profile");
    } else {
      res.redirect("/");
    }
  })
});

/*app.post("/", function (req, res) {
  var user = req.body.user;

  db.User.
  authenticate(user,
  function (err, user) {
    if (!err) {
      res.redirect("/profile");
    } else {
      res.redirect("/");
    }
  })
}); */

app.get("/signup", function (req, res) {
  var signupPath = path.join(views, "signup.html");
  res.sendFile(signupPath);
});

app.post("/signup", function (req, res) {

  var newUser = req.body.user;
  
  db.User.createSecure(newUser, function (err, user) {
  	console.log(user);
  	console.log(err);
    if (user) {
     req.login(user);
     res.redirect("/profile");
    } else {
      res.redirect("/signup");
    }
  
  });
});


app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/profile", function (req, res) {
  var profilePath = path.join(views, "profile.html");
  res.sendFile(profilePath);
});


app.get("/books", function (req, res) {

	db.Book.find({}, function(err,books) {
     
     res.send(books)
   
	})

});


app.post("/books" , function(req,res) {

	var newBook = req.body.book
	db.Book.create(newBook, function(err,book) {
         
		if (err) {
			console.log(err);
		} if (book) {
			res.send(book);
		}

	});
	//res.send(JSON.stringify(newBook));

})

/*app.delete("/books/:id", function(req,res) {

	db.Book.remove({_id: req.params.id}, function(err, results){
    
    	if(err) {
    		res.send(500).send({error:'database error'});
    	
    	} else {
    		res.send(200).send();
    	}



	});
});
*/

app.listen(3000, function () {
  console.log("Running!");
})



/*

app.get("/phrases", function (req, res){
  // find *all* phrases
  db.Phrases.find({}, function(err, results){
    // send them as JSON-style string
    res.send(JSON.stringify(results));
  })
});
*/