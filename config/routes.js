'use strict';

/*
 * Module dependencies.
 */

const home = require('../app/controllers/home');

/**
 * Route middlewares
 */

/**
 * Expose routes
 */

module.exports = function(app) {
   
  
  // home route
  app.get('/', home.index);

  // add task
  app.post('/tasks', function(req, res) {
    
    if (!req.body.title) {
      res.status(500).json({error: 'title does not exists!'});
    } else if (!req.body.description) {
      res.status(500).json({error: 'description does not exists!'});
    } else {

    res.status(201).json({
      id: 1,
      title:  req.body.title,
      description: req.body.description,
      status: 'to do',
      created_at: '24/08/2020',
      updated_at: '24/08/2020'
    });
  }
  });


  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    const payload = {
      url: req.originalUrl,
      error: 'Not found'
    };
    if (req.accepts('json')) return res.status(404).json(payload);
    res.status(404).render('404', payload);
  });
};
