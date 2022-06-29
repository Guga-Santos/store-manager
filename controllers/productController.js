const productService = require('../services/productService');

const getAll = async (_req, res, next) => {
  try {
    const data = await productService.getAll();
    if (!data) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await productService.findById(id);
    if (!data) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  findById,
};