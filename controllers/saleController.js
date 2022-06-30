const saleService = require('../services/saleService');

const getAll = async (_req, res, next) => {
  try {
    const data = await saleService.getAll();
    if (!data) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await saleService.findById(id);
    if (!data || data.length < 1) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  findById,
};