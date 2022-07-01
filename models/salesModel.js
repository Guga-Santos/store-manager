const connection = require('./connections');

const addSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  // https://www.w3schools.com/sql/func_mysql_now.asp
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

const getAll = async () => {
  const query = `SELECT s.sale_id as saleId, 
    sales.date, 
    s.product_id as productId, 
    s.quantity
    FROM StoreManager.sales_products AS s
    INNER JOIN StoreManager.sales
    ON sales.id = s.sale_id
    ORDER BY s.sale_id ASC, s.product_id;`;
  const [data] = await connection.execute(query);
  return data;
};

const findById = async (id) => {
  const query = `SELECT sales.date,
    s.product_id as productId,
    s.quantity
    FROM StoreManager.sales_products AS s
    INNER JOIN StoreManager.sales
    ON sales.id = s.sale_id
    WHERE s.sale_id = ?
    ORDER BY s.product_id;`;
  const [data] = await connection.execute(query, [id]);
  return data;
};

const deleteSales = async (id) => {
  const query = 'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;';
  await connection.execute(query, [id]);
  return true;
};

module.exports = {
  addSale,
  addSoldProduct,
  getAll,
  findById,
  deleteSales,
};