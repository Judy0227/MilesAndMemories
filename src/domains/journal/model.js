const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const journalSchema = new Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Journal = mongoose.model('Journal', journalSchema);
module.exports = Journal;
