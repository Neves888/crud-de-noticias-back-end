import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import Noticia from '../models/Noticia';

chai.use(chaiHttp);
const { expect } = chai;

describe('Noticias', () => {
    beforeEach(async () => {
        await Noticia.deleteMany({});
    });

    it('Deve criar uma nova notícia', (done) => {
        const noticia = {
            titulo: 'Título da Notícia',
            descricao: 'Descrição da Notícia'
        };

        chai.request(app)
            .post('/noticias')
            .send(noticia)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('titulo', noticia.titulo);
                expect(res.body).to.have.property('descricao', noticia.descricao);
                done();
            });
    });

    it('Deve listar todas as notícias', (done) => {
        chai.request(app)
            .get('/noticias')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('Deve atualizar uma notícia existente', (done) => {
        const noticia = new Noticia({
            titulo: 'Notícia para Atualização',
            descricao: 'Descrição da Notícia a ser Atualizada'
        });

        noticia.save().then((savedNoticia) => {
            const updatedNoticia = {
                titulo: 'Notícia Atualizada',
                descricao: 'Descrição da Notícia Atualizada'
            };

            chai.request(app)
                .put(`/noticias/${savedNoticia._id}`)
                .send(updatedNoticia)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('titulo', updatedNoticia.titulo);
                    expect(res.body).to.have.property('descricao', updatedNoticia.descricao);
                    done();
                });
        });
    });

    it('Deve deletar uma notícia existente', (done) => {
        const noticia = new Noticia({
            titulo: 'Notícia a ser Deletada',
            descricao: 'Descrição da Notícia a ser Deletada'
        });

        noticia.save().then((savedNoticia) => {
            chai.request(app)
                .delete(`/noticias/${savedNoticia._id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message', 'Notícia deletada com sucesso');
                    done();
                });
        });
    });
});
