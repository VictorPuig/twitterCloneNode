var _async = require('async');
var moment = require('moment');
//var timeFormat = "YYYY-MM-DD:HH:mm:ss:ZZ";
var computeTwitTime = function computeTwitTime(t) {
  var twits = t;
  _async.map(t, function(el, cb) {
    el.time = moment().diff(el.timestamp, 'minutes');
    cb(null, el);
  }, function (err, twits) {
    twits.time = t.time;
  });
  return twits;
}

module.exports = function(router) {
  var Twit = require('../models/Twit');

  router.route('/twits')
  .get(function (req, res) {
    Twit.find()
    .lean()
    .exec(function (err, twits) {
      if (err)
        return res.send(err);
        twits = computeTwitTime(twits);
      res.json(twits);
    })
  })
  .post(function (req, res) {
    var twit = new Twit();

    if (req.body.text)
      twit.text = req.body.text;
    if (req.body.img)
      twit.img = req.body.img;
    if (req.body.author)
      twit.author = req.body.author;

    twit.timestamp = moment();
    console.log("twiiiit: ", twit);
    twit.save(function(err, newTwit) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(newTwit);
    });
  });

  router.route('/twits/:twit_id')
  .delete(function (req, res) {
    Twit.remove({
      _id: req.params.twit_id
    }, function(err, twit) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.json({ message: 'Successfully deleted' });
    })
  });
}
