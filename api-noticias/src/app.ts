import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import noticiasRouter from './routes/noticia';

const app: Application = express();

app.use(bodyParser.json());

app.use('/noticias', noticiasRouter);

mongoose.connect('mongodb://localhost:27017/noticiasdb')
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

export default app;
