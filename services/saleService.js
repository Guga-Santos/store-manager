const salesModel = require('../models/salesModel');

const getAll = async () => {
  const data = await salesModel.getAll();
  return data;
};

const findById = async (id) => {
  const data = await salesModel.findById(id);
  return data;
};

module.exports = {
  getAll,
  findById,
};