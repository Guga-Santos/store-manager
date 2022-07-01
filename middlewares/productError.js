const productError = (erro, req, res, _next) => {
  res.status(500).json({ message: 'Internal Error' });
};

module.exports = productError;