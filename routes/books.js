var express 	= require('express');
var router 		= express.Router();
var request 	= require('request');

var endpoint	= 'https://api-mybookslibrary.herokuapp.com/';

/* GET home page. */
router.get('/', function(req, res, next){
	res.render('index');
});

router.get('/edit', function(req, res, next){
	res.render('edit');
});

router.get('/new', function(req, res, next) {
  res.render('new');
});

router.get('/delete', function(req, res, next) {
  res.render('delete');
});

/*All Books Table*/
router.get('/books', function(req, res, next){
	request.get(
	{ 
    	url: endpoint + '/books'
  	},
  	function (e, r, body) {
	    var alll_books = JSON.parse(body);
	    res.render('books', {books: alll_books})
  	});
})

router.post('/new', function(req, res, next){
	request.post(
	{ 
		url: endpoint + '/book', 
		form: req.body
	},
	function(error, response, body){
		console.log(body);
	});
	res.writeHead(302, {
  		'Location': '/'
	});
	res.end();
});

router.post('/edit', function(req, res, next){
	request.put(
	{ 
		url: endpoint + '/book/' + req.body.ID, 
		form: req.body
	},
	function(error, response, body){
		console.log(body);
	});
	res.writeHead(302, {
  		'Location': '/'
	});
	res.end();
});

router.post('/delete', function(req, res, next){
	request.del(
	{ 
    	url: endpoint + '/book/' + req.body.ID
  	},
	function(error, response, body){
		console.log(body);
	});
	res.writeHead(302, {
  		'Location': '/'
	});
	res.end();
});

module.exports = router;
