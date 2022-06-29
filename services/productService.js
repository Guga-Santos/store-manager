const productModel = require('../models/productModel');

const getAll = async () => {
  const data = await productModel.getAll();
  return data;
};

const findById = async (id) => {
  const data = await productModel.findById(id);
  return data;
};

module.exports = {
  getAll,
  findById,
};