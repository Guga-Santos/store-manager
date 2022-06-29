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

const addProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: '"name" is required' }); 
        }
        if (name.length < 5) {
          return res.status(422)
            .json({ message: '"name" length must be at least 5 characters long' }); 
        }
    const data = await productService.addProduct(name);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  findById,
  addProduct,
};