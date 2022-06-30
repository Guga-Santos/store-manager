const productModel = require('../models/productModel');

const getAll = async () => {
  const data = await productModel.getAll();
  return data;
};

const findById = async (id) => {
  const data = await productModel.findById(id);
  return data;
};

const addProduct = async (product) => {
  const data = await productModel.addProduct(product);
  return data;
};

const update = async (id, name) => {
  const data = await productModel.update(id, name);
  return data;
}; 

module.exports = {
  getAll,
  findById,
  addProduct,
  update,
};