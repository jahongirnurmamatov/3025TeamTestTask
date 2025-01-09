import express from "express";
import {
  deleteShortUrl,
  getAnalytics,
  getShortUrlAndRedirect,
  getShortUrlInfo,
  shortenUrl,
} from "../controllers/shortenUrl.controller.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:shortUrl", getShortUrlAndRedirect);
router.get("/info/:shortUrl", getShortUrlInfo);
router.delete("/delete/:shortUrl", deleteShortUrl);
router.get("/analytics/:shortUrl", getAnalytics);
export default router;
