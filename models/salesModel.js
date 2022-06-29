const connection = require('./connections');

const addSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const [data] = await connection.execute(query);
  const { insertId } = data;
  return insertId;
};

const addSoldProduct = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products 
                (sale_id, product_id, quantity) VALUES (?, ?, ?);`;
  
  await connection.execute(query, [saleId, productId, quantity]);
  return { productId, quantity };
};

module.exports = {
  addSale,
  addSoldProduct,
};