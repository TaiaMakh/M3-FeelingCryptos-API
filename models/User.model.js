
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, minlength: 6 },
  email: {
    type: String,
    unique: true, 
    lowercase: true,
    trim: true,
    required: true,
    match: [/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, 'Please fill a valid password']
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  photo: { type: String, default:"https://res.cloudinary.com/dkevcmz3i/image/upload/v1619125766/Service-Wall/user_avatar_xyyphc.png"},
  google_id: { type: String },
  favorites_cryptos: [String],
  notifications: [],
  pinned_feed: [{
      id: { type: Object, required: true},
      type: { type: String, enum: ['tweet', 'news'], required: true },
  }]
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;

      return ret;
    }
  }
})

const User = mongoose.model('User', userSchema);
module.exports = User;