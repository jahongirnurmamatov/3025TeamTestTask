import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import shortenUrlRoute from './routes/shortenUrl.route.js';
dotenv.config();

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173',
    }
));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/shortenUrl', shortenUrlRoute);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});