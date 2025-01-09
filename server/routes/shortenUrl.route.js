import express from 'express';
import { getShortUrlAndRedirect, shortenUrl } from '../controllers/shortenUrl.controller.js';

const router = express.Router();

router.post('/shorten',shortenUrl);
router.get('/:shortUrl',getShortUrlAndRedirect);


export default router;