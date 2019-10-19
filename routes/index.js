var express = require('express');
var router = express.Router();
var Movies = require('../models/movies');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'WLiT', fellow: { name: 'Sriza' } });
});


router.get('/movies', function (req, res, next) {
  //res.render('movies', data);
  Movies.find().exec((err, movies) => {
    res.render('viewMovies', { movies });
    console.log('....... data', movies);
    return movies;
  }
  )
});

router.get('/addmovies', async function (req, res, next) {
  res.render('addMovies');
});

router.post('/addmovie', function (req, res, next) {
  console.log(req.body);
  //creating a variable for 
  var movie = new Movies({
    name: req.body.name,
    cast: req.body.cast,
    genre: req.body.genre,
    description: req.body.description,
  });
  var movie = Movies.findOne({ _id: req.params._id });

  var promise = movie.save();
  promise.then((movie) => {
    console.log('Movie saved', movie);
    res.redirect('/movies');
  });

});
//await promise
//console.log('')
/*
router.get('/movies/:_id', function (req, res, next) {
  var movie = Movies.findOne({ _id: req.params._id });
  movie.then(() => {
    res.render('viewOne', { movie });
    console.log("Movie selected.....", movie);

  })
    .catch((err) => {
      console.log(err);
    })

})*/

router.get('/delete/:_id', function (req, res, next) {
  Movies.deleteOne({ _id: req.params._id }, function (err, movie) {
    console.log('movie deleted.....', movie);
    res.redirect('/movies');
  });

})

router.get('/edit/:_id', function (req, res, next) {
  Movies.findOne({ _id: req.params._id }, function (err, movie) {
    console.log('movie selected....', movie);
    res.render('updateMovie', { movie });
  });
})

router.post('/update', function (req, res, next) {
  Movies.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, function (err, movie) {
    //render('updateMovie', { movie });
    res.redirect('/movies');
  })
})


router.get('/movies/:_id', function (req, res, next) {

  Movies.findOne({ _id: req.params._id }, function (err, movie) {
    res.render('viewOne', { movie });
    console.log('Movie selected .....', movie);
  })
});
module.exports = router;
