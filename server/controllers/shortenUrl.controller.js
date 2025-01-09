import { generateHash256 } from "../middleware/generateHash256.js";
import ShortUrl from "../models/shortUrl.model.js";

export const shortenUrl = async (req, res) => {
  try {
    const { longUrl, expiresIn } = req.body;

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

    let expiresAt = null;
    if (expiresIn) {
        expiresAt = new Date();
        expiresAt.setUTCHours(expiresAt.getUTCHours() + expiresIn); 
    }
    const newShortUrl = await ShortUrl.create({ longUrl, shortUrl, expiresAt });
    await newShortUrl.save();
    res.status(200).json({ shortUrl: newShortUrl.shortUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShortUrlAndRedirect = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await ShortUrl.findOne({ shortUrl });
    if (!url) return res.status(404).json({ message: "Not Found" });

    if (url.expiresAt && new Date() > url.expiresAt) {
        return res.status(410).json({ error: "URL Gone" });  
    }

    if (url) {
      url.clicks++;
      await url.save();
      return res.status(200).json({ longUrl: url.longUrl });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getShortUrlInfo = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await ShortUrl.findOne({ shortUrl });
    if (!url) return res.status(404).json({ message: "Not Found" });
    if (url) {
      return res.status(200).json({
        longUrl: url.longUrl,
        createdAt: url.createdAt,
        clicks: url.clicks,
      });
    }
  } catch (error) {}
};

export const deleteShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await ShortUrl.findOne({ shortUrl });
    if (!url) return res.status(404).json({ message: "Not Found" });
    if (url) {
      await ShortUrl.deleteOne({ shortUrl });
      return res.status(200).json({ message: "Deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
