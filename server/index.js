import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
//components
import Connection from './db.js';
import Routes from './routes/Route.js';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', Routes);
