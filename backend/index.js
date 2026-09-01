import mongoose from 'mongoose';
import express from 'express';
import { PORT, MONGODB_URI } from './config.js';
import bookRouter from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(
  cors({
    origin:true,
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
  })
);

app.use('/books', bookRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('App connected to db');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
