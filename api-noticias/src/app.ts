import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import noticiasRouter from './routes/noticia';

const app: Application = express();  // Certifique-se de que o tipo Application é utilizado

// Middleware
app.use(bodyParser.json());

// Rotas
app.use('/noticias', noticiasRouter);

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/noticiasdb')
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

export default app;
