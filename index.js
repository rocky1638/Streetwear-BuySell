const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
var multerS3 = require('multer-s3');
const axios = require('axios');
var fs = require('fs');
var AWS = require('aws-sdk');
require('./models/User'); // Make sure require statements are in correct order
require('./models/Listing');
require('./services/passport');

const Listing = mongoose.model('listing');
const User = mongoose.model('user');

mongoose.Promise = global.Promise;

// aws
AWS.config.loadFromPath('./config/awsconfig.json');

var s3 = new AWS.S3();

const listingBucket = 'grailed.dev.listing.bucket';
var myKey = 'grailed-dev-bucket-key';

// s3.createBucket({ Bucket: listingBucket }, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     params = { Bucket: listingBucket, Key: myKey, Body: 'Test' };
//     s3.putObject(params, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Successfully loaded data');
//       }
//     });
//   }
// });

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 10 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: listingBucket,
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

// REALLY BIG LISTING ROUTE

app.post('/api/add_listing', upload.single('listingPicture'), (req, res) => {
  const listingPicture = req.file.location;

  const listing = new Listing({
    brand: req.body.brand,
    price: req.body.price,
    seller: [],
    listingPicture: listingPicture,
    isSold: false,
    category: req.body.category,
    color: req.body.color,
    name: req.body.name,
    description: req.body.description,
    size: req.body.size === undefined ? req.body.size : '',
    shoeSize: req.body.shoeSize === undefined ? req.body.shoeSize : 0
  });

  let updatedUser = req.user;
  updatedUser.listings.push(listing);
  listing.seller.push(updatedUser);

  listing
    .save()
    .then(() => User.findByIdAndUpdate(req.user._id, updatedUser))
    .then(() => Listing.findById(listing.id))
    .then(item => {
      res.send(item);
    });
});

// END REALLY BIG LISTING ROUTE

require('./routes/authRoutes')(app);
require('./routes/uploadRoutes')(app);

if (process.env.NODE_ENV == 'production') {
  // Express needs to serve up production assets like main.js
  app.use(express.static('client/build'));

  // Express needs to give index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'html'));
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
