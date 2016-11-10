var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project5');

// Create a Schema
var moviesSchema = mongoose.Schema({
    user: String,
    title: String,
    year: Number,
    dvd: Boolean,
    bluray: Boolean,
    fourk: Boolean,
    threed: Boolean,
    digital: Boolean    
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

//load the user database
router.get('/m/:user', function(req, res) {
  console.log("get /m/:user");
  var query = Movies.find({user: req.params.user});
  query.exec(function (err, movies) {
    res.json(movies);
  })
});

//post to the user database
router.post('/m/:user', function(req, res, next) {
  console.log('post /m/:user');
  console.log(req.body);
  var newItem = new Movies({user: req.params.user, title: req.body.title, year: req.body.year, dvd: req.body.dvd, bluray: req.body.bluray, threed: req.body.threed, fourk: req.body.fourk, digital: req.body.digital});
  console.log(newItem);
  newItem.save(function(err, post) {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  })
});

//make changes
router.put('/m/:id', function(req, res, next) {
  var updateData = {dvd: req.body.dvd, bluray: req.body.bluray, threed: req.body.threed, fourk: req.body.fourk, digital: req.body.digital};
  console.log(updateData);
  Movies.update({_id: req.params.id}, updateData, function(err, affected) {
    console.log("");
    res.sendStatus(200);
  })
});

router.delete('/m/:id', function(req, res, next) {
  Movies.findByIdAndRemove(req.params.id, function (err, offer) {
    if(err) { throw err; }
    res.sendStatus(200);
  })
});

module.exports = router;

