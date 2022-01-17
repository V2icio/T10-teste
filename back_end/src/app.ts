import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

// dotenv.config({
//   path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
// });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

export default app;
