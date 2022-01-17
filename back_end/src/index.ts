import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

app.listen(3001);
