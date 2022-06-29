const productsService = require('../../../services/productService');
const productsController = require('../../../controllers/productController');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Consulta os products no BD e retorna todos os dados encontrados', ()=>{
  const res = {};
  const req = {};
  const next = () => {};
  const resolve = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
  {
    "id": 3,
    "name": "Escudo do Capitão América"
  }
]
  beforeEach(()=>{
    res.status = sinon.stub().returns({});
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'getAll').resolves(resolve);
  });
  afterEach(()=>{
    productsService.getAll.restore();
  });
  it('é chamado o método "status" com o código 200', async()=>{
    await productsController.getAll(req, res, next);
    expect(res.status.calledWith(200)).to.be.equal(true)
  });
  it('é chamado o método "json" passando um array', async()=>{
    await productsController.getAll(req, res, next);
    expect(res.json.calledWith(sinon.match.array)).to.be.equal(true)
  })
})