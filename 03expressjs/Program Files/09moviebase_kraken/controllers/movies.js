'use strict';

var Movie = require('../models/movies');


module.exports = function (router) {

    var model = new Movie();

    router.get('/', function (req, res) {
        Movie.find({}, function(err, movies){
        	if(err){
        		res.send(err);
        	} else {
        		var model = {
        			movies: movies
        		}

        		res.render('movies', model);
        	}
        });  
    });

    router.get('/add', function(req, res){
        res.render('addmovies');
    });

    router.get('/details/:id', function(req, res){
        Movie.findOne({_id: req.params.id}, function(err, movie){
            if(err){
                res.send(err);
            } else {
                var model = {
                    movie: movie
                }

                res.render('details', model);
            }
        });
    });

    router.get('/edit/:id', function(req, res){
        Movie.findOne({_id: req.params.id}, function(err, movie){
            if(err){
                res.send(err);
            } else {
                var model = {
                    movie: movie
                }

                res.render('editmovies', model);
            }
        });
    });

    router.post('/search', function(req, res){
        console.log('Searching...');
        Movie.search(req.body.searchText, {title: 1, plot: 1, cover: 1}, {
            conditions: {title: {$exists: true},plot: {$exists: true},cover: {$exists: true}},
            sort: {title: 1},
            limit: 10
        }, function(err, movies) {
            if(err){
                res.send(err);
            } else {
                var model = {
                    movies: movies.results
                }

                res.render('movies', model);
            }
        });
    });

    router.get('/genre/:genre', function (req, res) {
        Movie.find({genre:req.params.genre}, function(err, movies){
            if(err){
                res.send(err);
            }

            var model = {
                movies: movies
            }
            
           res.render('movies', model); 
        });   
    });


    router.post('/add', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var release_date = req.body.release_date && req.body.release_date.trim();
        var genre = req.body.genre && req.body.genre.trim();
        var director = req.body.director && req.body.director.trim();
        var plot = req.body.plot && req.body.plot.trim();
        var trailer= req.body.trailer && req.body.trailer.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if (title == '' || release_date == '') {
            req.flash('error', "Please fill out required(*) fields");
            res.location('/movies/add');
            res.redirect('/movies/add');
        }

        var newMovie = new Movie({
            title: title,
            release_date: release_date,
            genre: genre,
            director: director,
            plot: plot,
            cover: cover,
            trailer: trailer
        });

        newMovie.save(function(err){
            if(err){
                res.send(err);
            } else {
                req.flash('success', "Movie Saved");
                res.location('/movies');
                res.redirect('/movies');
            }
        });
    });


router.post('/edit/:id', function(req, res){
        var title = req.body.title && req.body.title.trim();
        var release_date = req.body.release_date && req.body.release_date.trim();
        var genre = req.body.genre && req.body.genre.trim();
        var director = req.body.director && req.body.director.trim();
        var plot = req.body.plot && req.body.plot.trim();
        var trailer= req.body.trailer && req.body.trailer.trim();
        var cover = req.body.cover && req.body.cover.trim();

        if (title == '' || release_date == '') {
            req.flash('error', "Please fill out required(*) fields");
            res.location('/movies/edit/req.params.id');
            res.redirect('/movies/edit/req.params.id');
        }

        var query = {_id: req.params.id};

        var update = {
            title: title,
            release_date: release_date,
            genre: genre,
            director: director,
            plot: plot,
            cover: cover,
            trailer: trailer
        };

        Movie.update(query, update, function(err){
            if(err){
                res.send(err);
            } else {
                req.flash('success', "Movie Updated");
                res.location('/movies');
                res.redirect('/movies');
            }
        });
    });

router.delete('/delete/:id', function(req, res){
    var query = {_id: req.params.id};

    Movie.remove(query, function(err){
        if(err){
            res.send(err);
        } else {
           res.status(204).send();
        }
    });
});

};
