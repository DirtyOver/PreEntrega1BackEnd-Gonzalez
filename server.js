const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8080;

app.use(express.json());

const productsRouter = express.Router();

productsRouter.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync('productos.json'));
  res.json(products);
});

productsRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  const products = JSON.parse(fs.readFileSync('productos.json'));
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

productsRouter.post('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync('productos.json'));
  const newProduct = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails,
  };
  products.push(newProduct);
  fs.writeFileSync('productos.json', JSON.stringify(products));
  res.json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const products = JSON.parse(fs.readFileSync('productos.json'));
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = {
      id: productId,
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status,
      stock: req.body.stock,
      category: req.body.category,
      thumbnails: req.body.thumbnails,
    };
    fs.writeFileSync('productos.json', JSON.stringify(products));
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

productsRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  const products = JSON.parse(fs.readFileSync('productos.json'));
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    fs.writeFileSync('productos.json', JSON.stringify(products));
    res.json(deletedProduct[0]);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

app.use('/api/products', productsRouter);

const cartsRouter = express.Router();

cartsRouter.post('/', (req, res) => {
  const cartData = JSON.parse(fs.readFileSync('carrito.json'));
  // Resto de la lógica para crear un nuevo carrito
  fs.writeFileSync('carrito.json', JSON.stringify(cartData));
  res.json(cartData);
});

cartsRouter.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const carts = JSON.parse(fs.readFileSync('carrito.json'));
  const cart = carts.find((c) => c.id === cartId);
  if (cart) {
    res.json(cart);
  } else
  {
    res.status(404).json({ message: 'Carrito no encontrado' });
    }
    });
    
    cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;
    
    const carts = JSON.parse(fs.readFileSync('carrito.json'));
    const cartIndex = carts.findIndex((c) => c.id === cartId);
    
    if (cartIndex !== -1) {
    const cart = carts[cartIndex];
    const existingProduct = cart.products.find((p) => p.product === productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    
    fs.writeFileSync('carrito.json', JSON.stringify(carts));
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
    }
    });
    
    app.use('/api/carts', cartsRouter);
    
    app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    });