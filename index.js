import express from "express";
import mongoose from "mongoose";

import 'dotenv/config';

import userRoutes from "./routes/userRoutes.js";

// require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/user', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))