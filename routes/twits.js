var _async = require('async');
var moment = require('moment');
//var timeFormat = "YYYY-MM-DD:HH:mm:ss:ZZ";
var computeTwitTime = function computeTwitTime(t) {
  console.log("twits1", t);
  _async.map(t, function(el, cb) {
    //console.log(moment().diff(el.time, 'minutes'));
    //console.log(moment.duration(moment().diff(el.time)).humanize());
    el.time = moment().diff(el.timestamp, 'minutes');
//    console.log(moment().diff(el.time, 'minutes'));

    cb(null, el);
  }, function (err, twits) {
    console.log("twits2", twits);
    return twits;
  });
}

module.exports = function(router) {
  var Twit = require('../models/Twit');
  router.route('/twits')
  .get(function (req, res) {
    Twit.find()
    .exec(function (err, twits) {
      if (err)
        return res.send(err);
      res.send(twits);
    })
  })
  .post(function (req, res) {
    var twit = new Twit();

    if (req.body.text)
      twit.text = req.body.text;
    if (req.body.img)
      twit.img = req.body.img;
    if (req.body.title)
      twit.title = req.body.title;

    twit.time = moment();

    twit.save(function(err, newTwit) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(newTwit);
    });
  });
}
