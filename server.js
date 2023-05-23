const express = require('express');
const app = express();
const cartRouter = require('./routes/cartRouter');
const productsRouter = require('./routes/productsRouter');

app.use(express.json());

app.use('/cart', cartRouter);
app.use('/products', productsRouter);

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
