//User Routes
module.exports = function(router) {
  var User = require('../models/User');

  router.route('/users')
  .post(function(req, res) {
    var user = new User();

    if (req.body.name)
      user.name = req.body.name;
    if (req.body.username)
      user.username = req.body.username;
    if (req.body.email)
      user.email = req.body.email;
    if (req.body.password)
      user.password = req.body.password;
    if (req.body.img)
      user.img = req.body.img;

    User.findOne({email: req.body.email}, function (err, userFound) {
      if (userFound) {
        return res.json({message: 'This user already exists', userId: userFound.id});
      }
      else {
        // save the user and check for errors
        user.save(function(err, u) {
          if (err)
            return res.send(err);

          res.json({ message: 'User created!', userId: u.id});
        });
      }
    });
  })
  .get(function(req, res) {
    User.find()
    .exec(function (err, users) {
      if (err)
        return res.send(err);

      res.json(users);
    })
  });

  router.route('/users/:email')
  .get(function(req, res) {
    User.findOne({email: req.params.email}, function (err, userFound) {
      if (err)
        return res.send(err);

      res.json(userFound);
    });
  })

  router.route('/users/:user_id')
  .get(function(req, res) {
    User.findById(req.params.user_id)
    .exec(function(err, user) {
      if (err)
        return res.send(err);

      res.json(user);
      });
  })
  .put(function(req, res) {
  // use our user model to find the bear we want
    User.findById(req.params.user_id, function(err, user) {
      if (err)
        return res.send(err);

      // update the user info
      if (req.body.name)
        user.name = req.body.name;
      if (req.body.username)
        user.username = req.body.username;
      if (req.body.email)
        user.email = req.body.email;
      if (req.body.password)
        user.password = req.body.password;
      if (req.body.img)
        user.img = req.body.img;

      // save the user
      user.save(function(err) {
        if (err)
          return res.send(err);

        res.json({ message: 'user updated!' });
      });
    });
  })
  .delete(function(req, res) {
    User.remove({
      _id: req.params.userid
    }, function(err, user) {
      if (err)
        return res.send(err);

      res.json({ message: 'Successfully deleted' });
      });
  });
}
