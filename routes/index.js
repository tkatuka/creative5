var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project5');

// Create a Schema
var moviesSchema = mongoose.Schema({
    title: String,
    year: Number,
    user: String
});
var Movies = mongoose.model('Movies', moviesSchema);


// Connect to the database
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', function() {
  console.log("Successfully connected to database.");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My movie database' });
});

//load the database
router.get('/m', function(req, res) {
  res.status(200).json(Movies);
});

router.get('/m/:user', function(req, res) {
  console.log("get /m/:user");
  var query = Movies.find({user: req.params.user});
  query.exec(function (err, movies) {
    res.json(movies);
  })
});

router.post('/m/:user', function(req, res, next) {
  console.log('post /m/:user');
  var newItem = new Movies({user: req.params.user, title: req.body.title, year: req.body.year});
  console.log(newItem);
  newItem.save(function(err, post) {
    if(err) return console.error(err)
    console.log(post);
    res.sendStatus(200);
  })
});

module.exports = router;

