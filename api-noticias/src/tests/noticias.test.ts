import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import mongoose from 'mongoose';
import sinon from 'sinon';
import Noticia from '../models/Noticia';

chai.use(chaiHttp);
const { expect } = chai;

describe('Noticias', function(this: Mocha.Context) {
  this.timeout(15000);

  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/noticiasdb');
    }
  });

  after(async () => {
    await mongoose.disconnect();
  });

  beforeEach(() => {

    sinon.restore();
  });

  it('Deve criar uma nova notícia', (done) => {
    const noticia = {
      titulo: 'Título da Notícia',
      descricao: 'Descrição da Notícia',
    };


    const saveStub = sinon.stub(Noticia.prototype, 'save').resolves(noticia as any);

    chai.request(app)
      .post('/noticias')
      .send(noticia)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('titulo', noticia.titulo);
        expect(res.body).to.have.property('descricao', noticia.descricao);
        expect(saveStub.calledOnce).to.be.true;
        done();
      });
  });

  it('Deve listar todas as notícias', (done) => {
    const noticiasMock = [
      { titulo: 'Notícia 1', descricao: 'Descrição 1' },
      { titulo: 'Notícia 2', descricao: 'Descrição 2' }
    ];


    const findStub = sinon.stub(Noticia, 'find').resolves(noticiasMock as any);

    chai.request(app)
      .get('/noticias')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.deep.equal(noticiasMock);
        expect(findStub.calledOnce).to.be.true;
        done();
      });
  });

  it('Deve atualizar uma notícia existente', (done) => {
    const noticia = {
      titulo: 'Notícia para Atualização',
      descricao: 'Descrição da Notícia a ser Atualizada',
    };


    const findByIdAndUpdateStub = sinon.stub(Noticia, 'findByIdAndUpdate').resolves({
      ...noticia,
      titulo: 'Notícia Atualizada',
      descricao: 'Descrição Atualizada'
    } as any);

    chai.request(app)
      .put('/noticias/1')
      .send({
        titulo: 'Notícia Atualizada',
        descricao: 'Descrição Atualizada',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('titulo', 'Notícia Atualizada');
        expect(res.body).to.have.property('descricao', 'Descrição Atualizada');
        expect(findByIdAndUpdateStub.calledOnce).to.be.true;
        done();
      });
  });

  it('Deve deletar uma notícia existente', (done) => {
    const findByIdAndDeleteStub = sinon.stub(Noticia, 'findByIdAndDelete').resolves({
      _id: '1',
      titulo: 'Notícia a ser Deletada',
      descricao: 'Descrição da Notícia a ser Deletada',
    } as any);

    chai.request(app)
      .delete('/noticias/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Notícia deletada com sucesso');
        expect(findByIdAndDeleteStub.calledOnce).to.be.true;
        done();
      });
  });

});
