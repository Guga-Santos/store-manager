const productsService = require('../../../services/productService');
const productsController = require('../../../controllers/productController');
const {expect} = require('chai');
const sinon = require('sinon');

describe('Consulta os products no BD e retorna todos os dados encontrados', () => {
  const res = {};
  const req = {};
  const next = () => {};
  const resolve = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  }
  ]
  afterEach(sinon.restore)
  beforeEach(()=>{
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(resolve);
  });

  it('é chamado o método "status" com o código 200', async()=>{
    await productsController.getAll(req, res, next);
    expect(res.status.calledWith(200)).to.be.equal(true)
  });

  it('é chamado o método "json" passando um array', async()=>{
    await productsController.getAll(req, res, next);
    expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
  })
})

describe('Consulta products no BD e retorna o produto com id específico', () => {
  const res = {};
  const req = { params: { id: 1 } };
  const error = { params: { id: 5 } };
  const next = () => {};
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