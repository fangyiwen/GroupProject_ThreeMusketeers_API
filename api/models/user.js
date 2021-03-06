const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  uid: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  createTime: { type: String, required: true },
  // places: { type: String, required: true }
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'CustomPlace' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
