import express from 'express';
import connectingDB from './config/db.js';

const app = express();
const PORT = 4000;

connectingDB();

app.use('/', (req, res) => {
    res.send('Hello');
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})