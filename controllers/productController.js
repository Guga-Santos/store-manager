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

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const findId = await productService.findById(id);
    if (!name) return res.status(400).json({ message: '"name" is required' });
    if (name.length < 5) {
    return res.status(422)
      .json({ message: '"name" length must be at least 5 characters long' }); 
} 
    if (!findId) return res.status(404).json({ message: 'Product not found' });

    await productService.update(id, name);
    res.status(200).json({ id, name });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findId = await productService.findById(id);
    if (!findId) return res.status(404).json({ message: 'Product not found' });

    const deleted = await productService.deleteProduct(id);
    if (deleted) return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const searchProduct = async (req, res, next) => {
  try {
  const { q } = req.query;
  const data = await productService.searchProduct(q);
  return res.status(200).json(data);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAll,
  findById,
  addProduct,
  update,
  deleteProduct,
  searchProduct,
};