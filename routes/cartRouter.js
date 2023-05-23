const express = require('express');
const router = express.Router();

// Ruta GET '/cart'
router.get('/', (req, res) => {
  // Lógica para obtener el carrito
  res.json({ message: 'Obteniendo carrito' });
});

// Ruta POST '/cart'
router.post('/', (req, res) => {
  // Lógica para agregar un producto al carrito
  res.json({ message: 'Agregando producto al carrito' });
});

// Ruta DELETE '/cart'
router.delete('/', (req, res) => {
  // Lógica para vaciar el carrito
  res.json({ message: 'Vaciando carrito' });
});

module.exports = router;
