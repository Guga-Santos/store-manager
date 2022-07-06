const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connections');
const salesModel = require('../../../models/salesModel');

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
]

describe('Sales Model', () => {
  describe('Testa a função getAll', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute').returns([mock]));

    it('Testa se retorna um array', async () => {
      const res = await salesModel.getAll();
      expect(res).to.be.an('array');
    });
  
    it('Testa se retorna o mock', async () => {
      const res = await salesModel.getAll();
      expect(res).to.be.equal(mock);
    });
  });
  
  describe('Testa a função findById', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute').returns([[mock[0]]]));
  
    it('Testa se retorna um array', async () => {
      const res = await salesModel.findById(1);
      expect(res).to.be.an('array');
    });
  
    it('Testa se retorna o mock', async () => {
      const res = await salesModel.findById(1);
      expect(res[0]).to.be.deep.equal(mock[0]);
    });
  });
  
  describe('Testa a função deleteSales', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute').resolves());
  
    it('Testa se retorna um booleano', async () => {
      const res = await salesModel.deleteSales(1);
      expect(res).to.be.a('boolean');
    });
  
    it('Testa se retorna true', async () => {
      const res = await salesModel.deleteSales(1);
      expect(res).to.be.equal(true);
    });
  });
  
  describe('Testa a função addSale', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute').returns([{ insertId: 3 }]));
    
    it('Testa se retorna um insertID', async () => {
      const res = await salesModel.addSale();
      expect(res).to.be.equal(3);
    });
  });
  
  describe('Testa a função addSoldProduct', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute'));

    it('Deve retornar um objeto contendo as informações da venda', async () => {
      const res = await salesModel.addSoldProduct(1, 2, 1);
      expect(res).to.be.deep.equal({ productId: 2, quantity: 1 });
    });
  });

});