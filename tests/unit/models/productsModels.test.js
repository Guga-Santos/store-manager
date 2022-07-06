const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productModel');
const connection = require('../../../models/connections');

const mock = 
  [
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

  ];

  const mockID = 
  [
    {
      "id": 1,
      "name": "Martelo de Thor"
    },
    ];

describe('Products Model', () => {

  describe('Testando a função getAll', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute').resolves([mock]));
 

    it('Testa se retorna um array', async () => {
      const res = await productsModel.getAll();
      expect(res).to.be.an('array');
    })

    it('Testa se retorna um array de objetos', async () => {
      const res = await productsModel.getAll();
      expect(res).to.be.equal(mock);
    })
  })

  describe('Testando a função findById', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute').resolves([[mockID]]));

    it('Testa se retorna um array', async () => {
      const res = await productsModel.findById(1);
      expect(res).to.be.an('array');
    })

    it('Testa se retorna um array com um objetos', async () => {
      const res = await productsModel.findById(1);
      expect(res).to.be.deep.equal([mockID[0]]);
    })

  })

  describe('Testando a função addProduct', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]));

    it('Testa se retorna um objeto', async () => {
      const res = await productsModel.addProduct('Sabre de luz');
      expect(res).to.be.an('object');
    });
  
    it('Testa se retorna o id e nome do produto adicionado', async () => {
      const res = await productsModel.addProduct('Sabre de luz');
      const obj = { id: 4, name: 'Sabre de luz' }
      expect(res).to.be.deep.equal(obj);
    });
  })

  describe('Testando a função update', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute').resolves());

    it('Testa se retorna um booleano', async () => {
      const res = await productsModel.update(1, 'Blaster');
      expect(res).to.be.a('boolean');
    });
  
    it('should return true', async () => {
      const response = await productsModel.update(1, 'Blaster');
      expect(response).to.be.equal(true);
    });
  })

  describe('Testando a função delete', () => {
    afterEach(sinon.restore);
    beforeEach(() => sinon.stub(connection, 'execute').resolves());

    it('should return a boolean', async () => {
      const res = await productsModel.deleteProduct(1);
      expect(res).to.be.a('boolean');
    });
    it('should return true', async () => {
      const res = await productsModel.deleteProduct(1);
      expect(res).to.be.equal(true);
    });
  })

});