const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photos: [{ type: String }],
  description: {
    type: String,
  },
  perks: [{ type: String }],
  extraInfo: {
    type: String,
  },
  maxGuests: {
    type: Number,
  },
  price: {
    type: Number,
  },
  type: {
    type: String,
    enum: ["Treehouse", "Yurt", "Boat", "Cave", "Igloo", "Other"],
    required: true,
  },
  amenities: [{ type: String }],
  customProperties: [
    {
      name: { type: String, required: true },
      type: {
        type: String,
        enum: ["text", "number", "boolean"],
        required: true,
      },
      required: { type: Boolean, default: false },
      value: mongoose.Mixed,
    },
  ],
  reviews: [reviewSchema],
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
