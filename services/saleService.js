const salesModel = require('../models/salesModel');

const getAll = async () => {
  const data = await salesModel.getAll();
  return data;
};

const findById = async (id) => {
  const data = await salesModel.findById(id);
  return data;
};

const deleteSales = async (id) => {
  await salesModel.deleteSales(id);
  return true;
};

module.exports = {
  getAll,
  findById,
  deleteSales,
};