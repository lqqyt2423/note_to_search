require("./connect");
const mongoose = require("mongoose");

const Note = new mongoose.Schema({
  filename: { type: String },
  content: { type: String },
  user: { type: "ObjectId", ref: "User" }
});

// 不支持中文索引，暂时废弃
// Note.index({ filename: 'text', content: 'text' });

module.exports = mongoose.model("Note", Note);
