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
  var movie = new Movies({
    name: req.body.name,
    cast: req.body.cast,
    genre: req.body.genre,
    description: req.body.description,
  });

  var promise = movie.save();
  promise.then((movie) => {
    console.log('Movie saved', movie);
    /* Movies.find().exec((err, movies) => {
       res.render('viewMovies', { movies });
       console.log('....... data', movies);
       return movies;
     })*/
    res.redirect('/movies');
  });

});
//await promise;
//console.log('')

module.exports = router;
