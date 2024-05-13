import express from 'express';
import dotenv from 'dotenv';
import connectingDB from './config/db.js';
import vetRoutes from './routes/vetRoutes.js'

const app = express();
app.use(express.json()) //is to send json as req on postman
dotenv.config(); //scanning files .env

connectingDB();

// default route
app.use('/api/vets', vetRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})