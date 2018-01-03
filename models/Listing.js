const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  pictures: [String],
  brand: String,
  size: String, // Choosing from options?
  shoeSize: Number,
  pantSize: [Number, Number],
  price: Number,
  dateOfListing: Date,
  status: Boolean,
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

mongoose.model('listing', ListingSchema);
