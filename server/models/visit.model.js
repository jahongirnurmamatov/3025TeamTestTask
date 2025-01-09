import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  shortUrl: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShortUrl", 
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

const Visit = mongoose.model("Visit", visitSchema);

export default Visit;
