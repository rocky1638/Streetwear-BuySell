const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/profile');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.put('/api/update_user', (req, res) => {
    const values = req.body;

    User.findByIdAndUpdate(req.user.id, values, { new: true }).then(
      updatedUser => {
        console.log(updatedUser);
        res.send(updatedUser);
      }
    );
  });
};
