const connection = require('./connections');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [data] = await connection.execute(query);
  return data;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[data]] = await connection.execute(query, [id]);
  return data;
};

module.exports = {
  getAll,
  findById,
};