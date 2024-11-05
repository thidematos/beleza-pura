const express = require('express');
const contabilidadeController = require('./../controllers/contabilidadeController');

const router = express.Router();

router
  .route('/')
  .post(contabilidadeController.createContabilidade)
  .get(contabilidadeController.getAllContabilidade);

router
  .route('/:contabilidadeID')
  .delete(contabilidadeController.deleteContabilidade)
  .patch(contabilidadeController.updateContabilidade);

module.exports = router;
