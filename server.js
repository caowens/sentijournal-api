import express from 'express';
import * as dotenve from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';

dotenve.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api/posts', postRoutes);

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);

        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.essage);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(port, () => console.log(`listening on port ${port}`));
}).catch(err => console.log(err));