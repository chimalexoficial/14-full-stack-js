import express from 'express';
import dotenv from 'dotenv';
import connectingDB from './config/db.js';

const app = express();
dotenv.config(); //scanning files .env

connectingDB();

app.use('/', (req, res) => {
    res.send('Hello');
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})