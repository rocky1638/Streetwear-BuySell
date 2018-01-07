const mongoose = require('mongoose');
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
const User = mongoose.model('user');
const upload = require('../index');
