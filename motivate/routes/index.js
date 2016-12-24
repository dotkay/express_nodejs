var express = require('express');
var router = express.Router();
var Quote = require('../models/quotes.js');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Motivator', quote: '' });
});

router.get('/showquote', function (req, res) {
  getSize(Quote, showQuoten);
  function showQuoten (n) {
    var qid = Math.floor(Math.random() * n) + 1;
    console.log('random id: ', qid);
    Quote.find( { quoteid: qid }, function(err, q) {
      if (err) {
        console.log(err);
      }
      console.log('Quote text retrieved: ', q[0].quotetext);
      res.render('index', { title: 'Motivator', quote: q[0].quotetext, qauth: q[0].quoteauthor });
    });
  }


});

router.get('/addquote', function (req, res) {
  console.log('in addquote page..');
});

router.post('/addquote', function (req, res) {
  console.log('posted quote: ', req.body.quotetext);
  getSize(Quote, saveQuote);
  
  function saveQuote(n) {
    var new_quote = new Quote({
      quoteid: n + 1,
      quotetext: req.body.quotetext,
      quoteauthor: req.body.quoteauthor
    });
    new_quote.save(function (err) {
      if (err) {
        console.log('ERROR: saving the quote!'); 
        console.log(err);
      }
      else {
        console.log('INFO: quote saved!');
      }
    });
    res.redirect('/');
  }
});

function getSize(qu, callback) {
  Quote.count( {}, function (err, count) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('INFO: No. of documents', count);
      callback(count);
      return count;
    }
  })
}

module.exports = router;
