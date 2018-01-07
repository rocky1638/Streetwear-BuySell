const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    googleId: String,
    name: String,
    gender: String,
    username: String,
    favoriteBrand: String,
    email: String,
    profilePicture: String,
    size: String,
    pantWaist: Number,
    pantInseam: Number,
    shoeSize: Number,
    listings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'listing'
      }
    ]
  },
  { usePushEach: true }
);

mongoose.model('user', UserSchema);
