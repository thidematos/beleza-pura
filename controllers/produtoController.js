const Produto = require('../models/produtoModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllProdutos = catchAsync(async (req, res, next) => {
  const produtos = await Produto.find({});

  res.status(200).json({
    status: 'success',
    data: {
      produto: produtos,
    },
  });
});

exports.updateProduto = catchAsync(async (req, res, next) => {
  const produto = await Produto.findByIdAndUpdate(
    req.params.produtoId,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      produto,
    },
  });
});

exports.createProduto = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { produto, quantidade = 0, preco, validade } = req.body;

  const newProduto = await Produto.create({
    produto,
    quantidade,
    validade,
    preco,
  });

  res.status(201).json({
    status: 'success',
    data: {
      produto: newProduto,
    },
  });
});

exports.deleteProduto = catchAsync(async (req, res, next) => {
  const { produtoId } = req.params;

  await Produto.findByIdAndDelete(produtoId);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getSingleProduto = catchAsync(async (req, res, next) => {
  const { produtoId } = req.params;

  const produto = await Produto.findById(produtoId);

  if (!produto)
    return new AppError('Nenhum produto foi achado com esse ID!', 404);

  res.status(200).json({
    status: 'success',
    data: {
      produto,
    },
  });
});
