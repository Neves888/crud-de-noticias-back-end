import { Router, Request, Response } from 'express';
import Noticia from '../models/Noticia';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { titulo, descricao } = req.body;

    try {
        const novaNoticia = new Noticia({ titulo, descricao });
        await novaNoticia.save();
        res.status(201).json(novaNoticia);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: 'Ocorreu um erro desconhecido' });
        }
    }
});

router.get('/', async (req: Request, res: Response) => {
    try {
        const noticias = await Noticia.find();
        res.json(noticias);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Ocorreu um erro desconhecido' });
        }
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { titulo, descricao } = req.body;

    try {
        const noticia = await Noticia.findByIdAndUpdate(
            id,
            { titulo, descricao },
            { new: true }
        );
        if (!noticia) {
            return res.status(404).json({ message: 'Notícia não encontrada' });
        }
        res.json(noticia);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(400).json({ message: 'Ocorreu um erro desconhecido' });
        }
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const noticia = await Noticia.findByIdAndDelete(id);
        if (!noticia) {
            return res.status(404).json({ message: 'Notícia não encontrada' });
        }
        res.json({ message: 'Notícia deletada com sucesso' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Ocorreu um erro desconhecido' });
        }
    }
});

export default router;
