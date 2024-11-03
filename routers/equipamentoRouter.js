const express = require('express');
const equipamentoController = require('./../controllers/equipamentoController');

const router = express.Router();

router
  .route('/')
  .get(equipamentoController.getAllEquipamentos)
  .post(equipamentoController.createEquipamento);

router
  .route('/:equipamentoID')
  .delete(equipamentoController.deleteEquipamento)
  .patch(equipamentoController.updateEquipamento);

module.exports = router;
