const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    latitude: Number,
    longitude: Number,
    author: { type: mongoose.Schema.ObjectId, ref: 'User' }, // automatically get all users data
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        author: { type: mongoose.Schema.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
); // 2nd parameter for createdAt at Pin, auto create createdAt

module.exports = mongoose.model('Pin', PinSchema);
