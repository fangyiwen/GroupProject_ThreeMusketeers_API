const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  cid: { type: String, required: true },
  pid: { type: String, required: true },
  text: { type: String, required: true },
  images: { type: Array, required: true },
  uid: { type: String, required: true },
  createTime: { type: String, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
