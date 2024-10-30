const express = require('express');
const procedimentoController = require('./../controllers/procedimentoController');

const router = express.Router();

router
  .route('/')
  .get(procedimentoController.getAllProcedimentos)
  .post(procedimentoController.createProcedimento);

router
  .route('/:procedimentoID')
  .get(procedimentoController.getSingleProcedimento)
  .delete(procedimentoController.deleteProcedimento)
  .patch(procedimentoController.updateProcedimento);

module.exports = router;
