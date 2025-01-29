import { Schema, model, Document } from 'mongoose';

interface INoticia extends Document {
    titulo: string;
    descricao: string;
    id: number;
}

const NoticiaSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
});

export default model<INoticia>('Noticia', NoticiaSchema);
