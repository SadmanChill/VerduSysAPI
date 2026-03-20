const express = require('express');
const router = express.Router();
const VerduraController = require('../controllers/verduraController');

router.get('/stock/bajo', VerduraController.obtenerStockBajo);
router.get('/', VerduraController.obtenerTodas);
router.get('/:id', VerduraController.obtenerPorId);
router.post('/', VerduraController.crear);
router.put('/:id', VerduraController.actualizar);
router.delete('/:id', VerduraController.eliminar);

module.exports = router;