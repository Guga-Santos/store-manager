const saleService = require('../../../services/saleService');
const saleController = require('../../../controllers/saleController');
const {expect} = require('chai');
const sinon = require('sinon');

describe('Consulta sales no BD e retorna todos os dados encontrados', () => {
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
    sinon.stub(saleService, 'getAll').resolves(resolve);
  });
  it('é chamado o método "status" com o código 200', async()=>{
    await saleController.getAll(req, res, next);
    expect(res.status.calledWith(200)).to.be.equal(true)
  });
  it('é chamado o método "json" passando um array', async()=>{
    await saleController.getAll(req, res, next);
    expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
  })
})

describe('Consulta sales no BD e retorna o produto com id específico', () => {
  const res = {};
  const req = { params: { id: 1 } };
  const error = { params: { id: 5 } };
  const next = () => {};
  const resolve = [{}];
  afterEach(sinon.restore)
  it('é chamado o método "status" com o código 200', async () => {
    res.status = sinon.stub().returns(res);
    sinon.stub(saleService, 'findById').resolves(resolve);

    // res.json = sinon.stub().returns(resolve);

    await saleController.findById(req, res, next);
    expect(res.status.calledWith(200)).to.be.equal(true)
  });
  it('é chamado o método "status" com o código 404', async () => {
    res.status = sinon.stub().returns({});

    await saleController.findById(error, res, next);
    expect(res.status.calledWith(404)).to.be.equal(true)
  });
})