const express = require('express');
const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', (req, res) => {
  // Lógica para obtener todos los productos
  res.send('Obtener todos los productos');
});

// Ruta para obtener un producto por su id
router.get('/:productId', (req, res) => {
  const productId = req.params.productId;
  // Lógica para obtener un producto por su id
  res.send(`Obtener producto por id: ${productId}`);
});

module.exports = router;
