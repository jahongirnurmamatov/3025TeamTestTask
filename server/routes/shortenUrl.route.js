import express from 'express';
import { deleteShortUrl, getShortUrlAndRedirect, getShortUrlInfo, shortenUrl } from '../controllers/shortenUrl.controller.js';

const router = express.Router();

router.post('/shorten',shortenUrl);
router.get('/:shortUrl',getShortUrlAndRedirect);
router.get('/info/:shortUrl',getShortUrlInfo);
router.delete('/delete/:shortUrl',deleteShortUrl);
export default router;