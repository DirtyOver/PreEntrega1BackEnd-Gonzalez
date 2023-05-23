const express = require('express');
const router = express.Router();

// Ruta GET '/products'
router.get('/', (req, res) => {
  // Lógica para obtener todos los productos
  res.json({ message: 'Obteniendo todos los productos' });
});

// Ruta GET '/products/:id'
router.get('/:id', (req, res) => {
  // Lógica para obtener un producto por ID
  const productId = req.params.id;
  res.json({ message: `Obteniendo producto con ID ${productId}` });
});

module.exports = router;
