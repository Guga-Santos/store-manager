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

const addProduct = async (product) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [data] = await connection.execute(query, [product]);
  const { insertId } = data;
  const inserted = { id: insertId, name: product };
  return inserted;
};

module.exports = {
  getAll,
  findById,
  addProduct,
};