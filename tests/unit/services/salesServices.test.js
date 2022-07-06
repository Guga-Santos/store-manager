const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/saleService');

describe('Sales Service', () => {
  describe('Testa a função getAll', () => {
    it('Testa se é retornado um array', async () => {
    sinon.stub(salesService, 'getAll').resolves([{}]);
    const data = await salesModel.getAll();
    expect(data).to.be.an('array');
    })
  })

  describe('Testa a função findById', () => {
    it('Testa se é retornado um array', async () => {
    sinon.stub(salesService, 'findById').resolves([{}]);
    const data = await salesModel.findById(1);
    expect(data).to.be.an('array');
    })
  })

  describe('Testa a função deleteSales', () => {
    it('Testa se é retornado um array', async () => {
    sinon.stub(salesService, 'deleteSales').resolves(true);
    const data = await salesModel.deleteSales(1);
    expect(data).to.be.a('boolean');
    })
  })
})