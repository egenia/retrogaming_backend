var Bbs = require('../persister/bbs');
var Projet = require('../persister/projets');
var Feed = require('../persister/feeds');
var Note = require('../persister/notes');
var moment = require('moment');


module.exports = function(app, passport){
	
	app.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
	});

	 /* GET home page. */
	app.get('/',isAuthenticated, function(req, res) {
	   res.redirect('/readme');
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/readme',
		failureRedirect: '/login',
		failureFlash : true 
	}));

	app.get('/login', function(req, res) {
	   res.render('template/login', { message: req.flash('message') });
	});

  /* Formulaire WaryMe */
	app.get('/feedback', function(req, res) {
	   res.render('template/feedback', {});
	});	

	app.get('/logout', function(req, res) {
	   req.logout();
  	   res.redirect('/');
	});
	
	
	app.get('/signup', function(req, res){
		res.render('template/signup',{ message: req.flash('message') });
	});

	/* Handle Registration POST */
	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash : true 
	}));
	app.get('/readme',isAuthenticated, function(req, res) {
	   res.render('template/readme', {});
	});
	app.get('/dashboard',isAuthenticated, function(req, res) {
	   res.render('template/index', {});
	});
	app.get('/flot',isAuthenticated, function(req, res) {
	   res.render('template/flot', {});
	});
	app.get('/morris',isAuthenticated, function(req, res) {
	   res.render('template/morris', {});
	});
	app.get('/tables',isAuthenticated, function(req, res) {
	   res.render('template/tables', {});
	});
	app.get('/forms',isAuthenticated, function(req, res) {
	   res.render('template/forms', {});
	});
	app.get('/panelswells',isAuthenticated, function(req, res) {
	   res.render('template/panelswells', {});
	});
	app.get('/buttons',isAuthenticated, function(req, res) {
	   res.render('template/buttons', {});
	});
	app.get('/notifications',isAuthenticated, function(req, res) {
	   res.render('template/notifications', {});
	});
	app.get('/typography',isAuthenticated, function(req, res) {
	   res.render('template/typography', {});
	});
	app.get('/icons',isAuthenticated, function(req, res) {
	   res.render('template/icons', {});
	});
	app.get('/grid',isAuthenticated, function(req, res) {
	   res.render('template/grid', {});
	});
	app.get('/blank',isAuthenticated, function(req, res) {
	   res.render('template/blank', {});
	});
	
	app.get('/projets',isAuthenticated, function(req, res) {
	   res.render('template/projets', {});
	});

	app.get('/projets/list',isAuthenticated, function(req, res) {
		 Projet.find({}, 
	      function(err, projets) {
	        // In case of any error, return using the done method
	        if (err)
	          return done(err);
	        // Username does not exist, log error & redirect back
	        res.send(projets);
	      }
	    );
	});

	app.get('/gettotalfeed/:projet', function(req, res) {
		Feed.find({projet_id:req.param('projet')}, 
	      function(err, bbs) {
	        // In case of any error, return using the done method
	        if (err)
	          return done(err);
	        // Username does not exist, log error & redirect back
	        res.send(bbs.length);
	      }
	    );
	});

	app.post('/projet/create',isAuthenticated, function(req, res) {
		
		var newProjet = new Projet();
		// set the user's local credentials
		newProjet.identifiant = req.param('identifiant');
		newProjet.libelle = req.param('libelle');
		newProjet.description = req.param('description');
		//newProjet.username = req.user.username;
		
		// save the user
		newProjet.save(function(err) {
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
			}
			res.send({"result":true});
		});
	});

	app.get('/projet/:id',isAuthenticated, function(req, res) {		
	   res.render('template/feeds', {id: req.param('id')});
	});

	app.post('/feed/create', function(req, res) {
		console.log(req);
		var newFeed = new Feed();
		// set the user's local credentials
		newFeed.identifiant = req.param('identifiant');
		newFeed.version = req.param('version');
		newFeed.auteur = req.param('auteur');
		newFeed.type = req.param('type');
		newFeed.category = req.param('category');
		newFeed.projet_id = req.param('projet_id');
		newFeed.description = req.param('description');
		newFeed.like_status = req.param('like');
		newFeed.like_desc = req.param('like_desc');
		newFeed.type_deux = req.param('type2');
		//newProjet.username = req.user.username;
		
		// save the user
		newFeed.save(function(err) {
			if (err){
			  console.log('Error in Saving feedback: '+err);  
			  res.send({"result":false});
			}
			res.send({"result":true});
		});
	});

	app.get('/feeds/list/:id',isAuthenticated, function(req, res) {
		 Feed.find({projet_id:req.param('id')}, 
	      function(err, bbs) {
	        // In case of any error, return using the done method
	        if (err)
	          return done(err);
	        // Username does not exist, log error & redirect back
	        res.send(bbs);
	      }
	    );
	});

	app.post('/feed/archive', isAuthenticated, function(req, res){
		console.log(req.param('id'));
		Feed.findOne({ _id: req.param('id') }, function (err, feed){
			feed.archive = !feed.archive;
			feed.save(function(err) {
				if (err){
				console.log('Error in Saving bbs: '+err);  
				res.send({"result":false});
				}
				res.send({"result":true});
			});
		});	
	});

	app.get('/feed/detail/:id',isAuthenticated, function(req, res) {		
	   Feed.findOne({ _id: req.param('id') }, function (err, feed){
			res.render('template/feeddetail', {feed: feed, id:req.param('id'), moment: moment});
		});	
	   
	});

	app.post('/note/create',isAuthenticated, function(req, res) {
		
		var newNote = new Note();
		// set the user's local credentials
		newNote.feed_id = req.param('feed_id');
		newNote.type = req.param('type');
		newNote.texte = req.param('texte');
		//newProjet.username = req.user.username;
		
		// save the user
		newNote.save(function(err) {
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
			}
			res.send({"result":true});
		});
	});

	app.get('/notes/list/:id',isAuthenticated, function(req, res) {
		 Note.find({feed_id:req.param('id')}, 
	      function(err, bbs) {
	        // In case of any error, return using the done method
	        if (err)
	          return done(err);
	        // Username does not exist, log error & redirect back
	        res.send(bbs);
	      }
	    );
	});

	////////////

  	app.get('/bbs',isAuthenticated, function(req, res) {
	   res.render('template/bbs', {});
	});
	
	app.get('/bbs/list',isAuthenticated, function(req, res) {
		 Bbs.find({}, 
	      function(err, bbs) {
	        // In case of any error, return using the done method
	        if (err)
	          return done(err);
	        // Username does not exist, log error & redirect back
	        res.send(bbs);
	      }
	    );
	});

	app.post('/bbs/create',isAuthenticated, function(req, res) {
		
		var newBbs = new Bbs();
		// set the user's local credentials
		newBbs.content = req.param('content');
		newBbs.vote = 0;
		newBbs.username = req.user.username;
		
		// save the user
		newBbs.save(function(err) {
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
			}
			res.send({"result":true});
		});
	});

	app.post('/bbs/delete',isAuthenticated, function(req, res) {
		// set the user's local credentials
		var id = req.param('id');
		Bbs.findByIdAndRemove(id,function(err){
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
			}


			res.send({"result":true});
		})

		
	});
	app.post('/bbs/update',isAuthenticated, function(req, res) {
		// set the user's local credentials
		var id = req.param('id');

		Bbs.findById(id,function(err,bbs){
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
			}
			bbs.vote +=1;
			bbs.save(function(){
				res.send({"result":true});	
			})
			
		})
	});
}
	// As with any middleware it is quintessential to call next()
	// if the user is authenticated
	var isAuthenticated = function (req, res, next) {
	  if (req.isAuthenticated())
	    return next();
	  res.redirect('/login');
	}



