import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
        unique: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null },
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

export default ShortUrl;