import express from "express";
import { PORT, mongoDBConnection } from './config.js';
import mongoose from "mongoose";

const app = express();


mongoose
    .connect(mongoDBConnection)
    .then(() => {
        console.log('Successful! Connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });