const productError = (erro, req, res, _next) => {
  res.status(500).json({ message: 'Product not found' });
};

module.exports = productError;