const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productModel');
const productsService = require('../../../services/productService');

const mock = [
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

describe('Products Service', () => {

});