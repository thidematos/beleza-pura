const express = require('express');
const produtoController = require('./../controllers/produtoController');

const router = express.Router();

router
  .route('/')
  .get(produtoController.getAllProdutos)
  .post(produtoController.createProduto);

router
  .route('/:produtoId')
  .delete(produtoController.deleteProduto)
  .get(produtoController.getSingleProduto)
  .patch(produtoController.updateProduto);

module.exports = router;
