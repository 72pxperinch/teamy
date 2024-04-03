import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config.js';
import userRoute from './routes/userRoute.js';
import teamRoute from './routes/teamRoute.js';

import cors from 'cors';
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,       
    optionSuccessStatus:200
}

import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  dbName: 'teamy',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB!");
  // Now you can ping the database
  mongoose.connection.db.admin().command({ ping: 1 })
  .then(() => {
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Failed to ping MongoDB:", error);
  });
})
.catch((error) => {
  console.log("Failed to connect to MongoDB:", error);
});

const app = express();


app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/teams', teamRoute);
app.use(express.static(path.join(__dirname, '/../frontend/src')));

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:' + process.env.PORT);
});
