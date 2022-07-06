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

const deleteSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findId = await saleService.findById(id);
    if (!findId || findId.length < 1) return res.status(404).json({ message: 'Sale not found' });

    const deleted = await saleService.deleteSales(id);
    if (deleted) return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const newSale = async (req, res, next) => {
  try {
    const sale = await saleService.newSale(req.body);
    return res.status(sale.code).json(sale.message);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => { 
  try {
    const { id } = req.params;
    const data = await saleService.findById(id);
    if (!data || data.length < 1) return res.status(404).json({ message: 'Sale not found' });

    const updated = await saleService.update(id, req.body);
    return res.status(updated.code).json(updated.message);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  findById,
  deleteSales,
  newSale,
  update,
};