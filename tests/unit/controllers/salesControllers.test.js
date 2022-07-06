const saleService = require('../../../services/saleService');
const saleController = require('../../../controllers/saleController');
const {expect} = require('chai');
const sinon = require('sinon');
const { beforeEach } = require('mocha');

const mock = [
  {
    "date": "2022-06-30T00:36:01.000Z",
    "saleId": 1,
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2022-06-30T00:36:01.000Z",
    "saleId": 1,
    "productId": 2,
    "quantity": 10
  },
  {
    "date": "2022-06-30T00:36:01.000Z",
    "saleId": 2,
    "productId": 3,
    "quantity": 15
  }
];

describe('Sales Controller', ()=> {
describe('Consulta sales no BD e retorna todos os dados encontrados', () => {
  const res = {};
  const req = {};
  const next = () => {};
  afterEach(sinon.restore)
  beforeEach(()=>{
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(saleService, 'getAll').resolves(mock);
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
  
describe('Testa a função deleteSales', () => {
  const res = {};
  const req = { params: { id: 1 } };
  const next = () => {};
  const resolve = [{}];
  afterEach(sinon.restore)

  it('Testa se há retorno do status 204', async () => {
    res.status = sinon.stub().returns(res);
    sinon.stub(saleService, 'findById').resolves(resolve);
    await saleController.deleteSales(req, res, next);
    expect(res.status.calledWith(204)).to.be.equal(true);
  })
})

  describe('Testa a função newSale', () => {
  const res = {};
  const req = {};
  const next = () => {};
  const resolve = [{}];
    afterEach(sinon.restore)

    it('Testa se retorna o status 201', async () => {
      res.status = sinon.stub().returns(res);
      sinon.stub(saleService, 'newSale').resolves({ code: 201, sold: { id: 3, itemsSold: [{ productId: 1, quantity: 5 }] } });
      await saleController.newSale(req, res, next);
      expect(res.status.calledWith(201)).to.be.equal(true);
    })
  })
})