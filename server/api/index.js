const express = require('express');
const api = express.Router();
const Note = require('../models/Note');
const _ = require('lodash');
const DIRNAME = '/Users/liqiang/Documents/programming_note/';
const exec = require('child_process').exec;

api.get('/posts', (req, res) => {
  let q = req.query.q;
  if (!q) {
    Note.find({})
    .sort('-filename')
    .then(doc => res.json(doc));
  } else {
    let query = {};
    let regexp = new RegExp(_.escapeRegExp(q), 'i');
    let regexpGlobal = new RegExp(_.escapeRegExp(q), 'gi');
    query.content = { $regex: regexp };
    Note.find(query)
    .sort('-filename')
    .then(docs => {
      docs = docs.map(doc => {
        return {
          _id: doc._id,
          filename: doc.filename,
          content: doc.content,
          score: score(regexpGlobal, doc.filename, doc.content)
        };
      });
      docs.sort(compare('score'));
      res.json(docs);
    });
  }
});

api.post('/posts/:id', (req, res) => {
  Note.findOne({ _id: req.params.id })
  .then(doc => {
    let pathname = DIRNAME + doc.filename;
    exec(`open ${pathname}`, (e) => {
      if (e) throw e;
      res.statusCode = 201;
      res.end('ok');
    });
  }).catch(e => {
    res.statusCode = 500;
    res.end();
  });

});

module.exports = api;


// 文章相关性打分
function score(regexp, filename, content) {
  let count = 0;
  content.replace(regexp, (match) => {
    ++count;
  });
  let score = Math.round((regexp.source.length)*count/(content.length)*10000);
  if (regexp.test(filename)) score += 1000;
  return score;
}

// 文章对象排序
function compare(key) {
  return (obj1, obj2) => {
    return obj2[key] - obj1[key];
  };
}
