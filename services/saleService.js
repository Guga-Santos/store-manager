const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const getAll = async () => {
  const data = await salesModel.getAll();
  return data;
};

const findById = async (id) => {
  const data = await salesModel.findById(id);
  return data;
};

const deleteSales = async (id) => {
  await salesModel.deleteSales(id);
  return true;
};

// const addSale = async () => {
//   const data = await salesModel.addSale();
//   return data;
// }

// const addSoldProduct = async (saleId, productId, quantity) => {
//   const data = await salesModel.addSoldProduct(saleId, productId, quantity);
//   return data;
// }

const productsAuth = async (id) => {
  const data = await productModel.findById(id);
  if (!data) return false;
  return true;
};

const salesAuth = (products) => {
  const idAuth = products.some((product) => !product.productId);
  const quantityAuth = products.some((product) => !product.quantity);
  const quantityMin = products.some((product) => product.quantity <= 0);

  if (idAuth) return { code: 400, message: { message: '"productId" is required' } };
  if (quantityMin) {
 return {
    code: 422,
    message: { message: '"quantity" must be greater than or equal to 1' },
  }; 
}
  if (quantityAuth) return { code: 400, message: { message: '"quantity" is required' } };
  
  return {};
};

const newSale = async (prod) => {
  const saleAuth = salesAuth(prod);
  if (saleAuth.code) return saleAuth;  
   const auth = [];
  for (let i = 0; i < prod.length; i += 1) {
      const result = productsAuth(prod[i].productId);
      auth.push(result);
  }
  const auths = await Promise.all(auth);
  // https://medium.com/@chrisjr06/why-and-how-to-avoid-await-in-a-for-loop-32b86722171
    const notFound = auths.some((item) => item !== true);
    if (notFound) return { code: 404, message: { message: 'Product not found' } };
    const saleId = await salesModel.addSale();
    const items = [];
    for (let i = 0; i < prod.length; i += 1) {
     const result = salesModel.addSoldProduct(saleId, prod[i].productId, prod[i].quantity);
    items.push(result);
    }
  const itemsSold = await Promise.all(items);
  return { code: 201, message: { id: saleId, itemsSold } };
};

module.exports = {
  getAll,
  findById,
  deleteSales,
  newSale,
};