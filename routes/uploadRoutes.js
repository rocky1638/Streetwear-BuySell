const mongoose = require('mongoose');
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
const User = mongoose.model('user');
const Listing = mongoose.model('listing');
const upload = require('../index');

module.exports = app => {
  app.get('/api/fetch_items', (req, res) => {
    Listing.find({}).then(items => res.send(items));
  });

  app.get('/api/fetch_item', (req, res) => {
    const { id } = req.query;
    Listing.findById(id).then(listing => {
      res.send(listing);
    });
  });
};
