'use strict';

/**
 * Module dependencies.
 */

//const mongoose = require('mongoose');
//const Article = mongoose.model('Article');
const assign = Object.assign;


/**
 * List
 */

exports.index = function(req, res) {

  //res.set('Content-Type', 'application/json')
  res.send("Hello world")
};

/**
 * New article
 */

exports.new = function(req, res) {
  res.render('articles/new', {
    title: 'New Article',
    article: new Article()
  });
};

/**
 * Create an article
 */

exports.create = function(req, res) {
  const article = new Article(only(req.body, 'title body tags'));
  article.user = req.user;
  try {
    article.uploadAndSave(req.file);
    req.flash('success', 'Successfully created article!');
    res.redirect(`/articles/${article._id}`);
  } catch (err) {
    res.status(422).render('articles/new', {
      title: article.title || 'New Article',
      errors: [err.toString()],
      article
    });
  }
};

/**
 * Edit an article
 */

exports.edit = function(req, res) {
  res.render('articles/edit', {
    title: 'Edit ' + req.article.title,
    article: req.article
  });
};

/**
 * Update article
 */

exports.update = function(req, res) {
  const article = req.article;
  assign(article, only(req.body, 'title body tags'));
  try {
    article.uploadAndSave(req.file);
    res.redirect(`/articles/${article._id}`);
  } catch (err) {
    res.status(422).render('articles/edit', {
      title: 'Edit ' + article.title,
      errors: [err.toString()],
      article
    });
  }
};

/**
 * Show
 */

exports.show = function(req, res) {
  res.render('articles/show', {
    title: req.article.title,
    article: req.article
  });
};

/**
 * Delete an article
 */

exports.destroy = function(req, res) {
  req.article.remove();
  req.flash('info', 'Deleted successfully');
  res.redirect('/articles');
};
