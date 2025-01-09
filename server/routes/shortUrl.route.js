import express from 'express';

const router = express.Router();

router.post('/shorten',shortenUrl);


export default router;