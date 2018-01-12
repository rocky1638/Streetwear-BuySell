const mongoose = require('mongoose');
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
const User = mongoose.model('user');
const Listing = mongoose.model('listing');
const upload = require('../index');

module.exports = app => {
  app.get('/api/fetch_items', (req, res) => {
    const { q } = req.query;
    Listing.find({
      $text: {
        $search: q
      }
    }).then(items => {
      console.log(items);
      res.send(items);
    });
  });

  app.get('/api/fetch_item', (req, res) => {
    const { id } = req.query;
    Listing.findById(id)
      .populate('seller')
      .then(listing => {
        res.send(listing);
      });
  });

  app.get('/api/fetch_user_items', (req, res) => {
    const { id } = req.user;
    User.findById(id)
      .populate('listings')
      .then(user => {
        res.send(user.listings);
      });
  });
};
