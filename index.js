import express from "express";
import { PORT, mongoDBConnection } from './config.js';
import mongoose from "mongoose";
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.set('views', './public/views');
app.set('view engine', 'ejs'); 
app.use(express.static("public"));
app.use(express.static('./'));


//Rota Principal que redireciona para a rota /books
app.get('/', async function(req, res) {
    return res.status(234).redirect("/books");
});

app.use('/books', bookRoutes);
app.use('/', userRoutes);

mongoose
    .connect(mongoDBConnection)
    .then(() => {
        console.log('Successful! Connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
