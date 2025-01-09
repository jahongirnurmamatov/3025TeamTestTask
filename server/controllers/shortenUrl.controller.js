import { generateHash256 } from "../middleware/generateHash256.js";
import ShortUrl from "../models/shortUrl.model.js";

export const shortenUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;

    // check if exists already
    const exists = await ShortUrl.findOne({ longUrl });
    if (exists) {
      return res.status(200).json({ shortUrl: exists.shortUrl });
    }
    //  this is just to awoid possible collisions even if chance is small
    let shortUrl;
    do {
      shortUrl = generateHash256(longUrl).slice(0, 6);
    } while (await ShortUrl.findOne({ shortUrl }));

    const newShortUrl = await ShortUrl.create({ longUrl, shortUrl });
    await newShortUrl.save();
    res.status(200).json({ shortUrl: newShortUrl.shortUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
