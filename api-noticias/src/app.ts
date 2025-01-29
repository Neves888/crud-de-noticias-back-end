import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import noticiasRouter from './routes/noticia';

const app: Application = express();

app.use(bodyParser.json());

app.use('/noticias', noticiasRouter);

mongoose.connect('mongodb://mongo:27017/noticiasdb')
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

    app.listen(3000, '0.0.0.0', () => {
        console.log('Servidor rodando na porta 3000');
    });

export default app;
