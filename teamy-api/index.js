// import express from 'express';
// import path from 'path';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import config from './config.js';
// import userRoute from './routes/userRoute.js';
// import teamRoute from './routes/teamRoute.js';

// import cors from 'cors';
// const corsOptions ={
//   origin:'*', 
//   credentials:true,       
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));


// import dotenv from 'dotenv';
// dotenv.config();

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const mongodbUrl = config.MONGODB_URL;
// mongoose.connect(mongodbUrl, {
//   dbName: 'teamy',
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log("Connected to MongoDB!");
//   // Now you can ping the database
//   mongoose.connection.db.admin().command({ ping: 1 })
//   .then(() => {
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   })
//   .catch((error) => {
//     console.log("Failed to ping MongoDB:", error);
//   });
// })
// .catch((error) => {
//   console.log("Failed to connect to MongoDB:", error);
// });

// const app = express();




// app.use(bodyParser.json());
// app.use('/api/users', userRoute);
// app.use('/api/teams', teamRoute);
// app.use(express.static(path.join(__dirname, '/../frontend/src')));

// app.listen(config.PORT, () => {
//   console.log('Server started at http://localhost:' + process.env.PORT);
// });


import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config.js";
import userRoute from "./routes/userRoute.js";
import teamRoute from "./routes/teamRoute.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Initialize dotenv
dotenv.config();

// Convert ES Module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize Express
const app = express();

// CORS configuration
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body Parser
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoute);
app.use("/api/teams", teamRoute);

// Serve static files (this is optional, only if you need it)
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, {
      dbName: "teamy",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
connectDB();

// Remove `app.listen()` (Vercel doesn't allow it)
export default app;
