const express = require('express');
const rescue = require('express-rescue');
const errorMiddleware = require('./middlewares/productError'); 
const productRoute = require('./routes/productRoute');
const saleRoute = require('./routes/salesRoute');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('products/:id', rescue(productRoute));
app.use('/products', rescue(productRoute));

app.use('sales/:id', rescue(saleRoute));
app.use('/sales', rescue(saleRoute));

app.use(errorMiddleware);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;