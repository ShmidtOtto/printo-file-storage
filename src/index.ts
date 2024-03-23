import express, { Express } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileRouter } from './routes';

dotenv.config();

const app: Express = express();

app.use(express.json());


const port = process.env.PORT;
const bdUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/';
const bdName = process.env.MONGO_DB_NAME || 'printo-filestorage';


mongoose.connect(bdUrl + bdName).then(() => {}).catch(error => console.error(error));

app.use(express.raw({ type: 'application/octet-stream', limit: '10mb' }));
app.use('/v1/files', fileRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
