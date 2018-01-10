const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema(
  {
    listingPicture: String,
    brand: String,
    size: String, // Choosing from options?
    category: String,
    shoeSize: Number,
    pantSize: [Number, Number],
    price: Number,
    dateOfListing: Date,
    isSold: Boolean,
    seller: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  { usePuchEach: true }
);

mongoose.model('listing', ListingSchema);
