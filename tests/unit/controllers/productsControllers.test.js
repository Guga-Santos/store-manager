const productsService = require('../../../services/productService');
const productsController = require('../../../controllers/productController');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Products Controller', () => {
  describe('Consulta os products no BD e retorna todos os dados encontrados', () => {
    const res = {};
    const req = {};
    const next = () => { };
    const resolve = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      }
    ]
    afterEach(sinon.restore)
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves(resolve);
    });

    it('Testa seé chamado o método "status" com o código 200', async () => {
      await productsController.getAll(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true)
    });

    it('Testa se é chamado o método "json" passando um array', async () => {
      await productsController.getAll(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    })
  })

  describe('Consulta products no BD e retorna o produto com id específico', () => {
    const res = {};
    const req = { params: { id: 1 } };
    const error = { params: { id: 5 } };
    const next = () => { };
    const resolve = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      }
    ]
    afterEach(sinon.restore)
    it('é chamado o método "status" com o código 200', async () => {
      res.status = sinon.stub().returns(res);
      sinon.stub(productsService, 'findById').resolves(resolve);

      // res.json = sinon.stub().returns(resolve);

      await productsController.findById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true)
    });
  
    it('é chamado o método "status" com o código 404', async () => {
      res.status = sinon.stub().returns(res);

      await productsController.findById(error, res, next);
      expect(res.status.calledWith(404)).to.be.equal(true)
    });

    it('em caso de erro é chamado o método "json" retornando um objeto', async () => {
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById').resolves({});
      await productsController.findById(req, res, next);

      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  })

  describe('Testa a função addProduct', () => {
    const req = {};
    const res = {};
    const next = () => { };
    afterEach(sinon.restore);
    beforeEach(() => {
      req.body = { name: 'Sabre de luz' }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    it('Testa se retorna o status 201', async () => {
      sinon.stub(productsService, 'addProduct').resolves(req.body);
      await productsController.addProduct(req, res, next);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  
    it('Testa se retorna o produto criado', async () => {
      await productsController.addProduct(req, res, next);
      expect(res.json.calledWith({ id: 4, name: 'Sabre de luz' }))
        .to.be.equal(true);
    });

    it('Testa se Error quando name tem menos de 5 letras', async () => {
      await productsController.addProduct({ body: { name: 'Bola' } }, res, next);
      expect(res.status.calledWith(422)).to.be.equal(true);
    })

    it('Testa se Error quando não há name', async () => {
      await productsController.addProduct({ body: {} }, res, next);
      expect(res.status.calledWith(400)).to.be.equal(true);
    })
  })

  describe('Testa a função update', () => {
    const req = {};
    const res = {};
    const next = () => { };
    const resolve = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      }
    ]
    afterEach(sinon.restore);
    beforeEach(() => {
      req.body = { name: 'Sabre de luz' }
      req.params = { id: 1 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById').resolves(resolve);
    });

    it('Testa se retorna status 200', async () => {
      await productsController.update(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    
    it('Testa se há o retorno esperado', async () => {
      await productsController.update(req, res, next);
      expect(res.json.calledWith({ id: 1, name: 'Sabre de luz' }))
      .to.be.equal(true);
    });

    it('Testa se retorna Erro se name tiver menos de cinco letras', async () => {
      await productsController.update({ body: { name: 'Bola' }, params: { id: 1} }, res, next);
      expect(res.status.calledWith(422)).to.be.equal(true);
    })

  })

  describe('Testa a função deleteProduct', () => {
  const req = {};
    const res = {};
    const next = () => { };
    const resolve = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      }
    ]
    afterEach(sinon.restore);
    beforeEach(() => {
      req.body = { name: 'Sabre de luz' }
      req.params = { id: 1 }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'findById').resolves(resolve);
    });

    it('Testa se há retorno do status 204', async () => {
      await productsController.deleteProduct(req, res, next);
      expect(res.status.calledWith(204)).to.be.equal(true);
    })   
  });
})
