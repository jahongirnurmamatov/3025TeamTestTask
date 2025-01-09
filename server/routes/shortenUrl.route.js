import express from 'express';
import { shortenUrl } from '../controllers/shortenUrl.controller.js';

const router = express.Router();

router.post('/shorten',shortenUrl);


export default router;