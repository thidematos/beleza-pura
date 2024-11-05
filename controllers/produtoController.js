const Produto = require('../models/produtoModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Procedimentos = require('./../models/procedimentoModel');

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
  const newProduto = await Produto.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      produto: newProduto,
    },
  });
});

exports.deleteProduto = catchAsync(async (req, res, next) => {
  const { produtoId } = req.params;

  const procedimentos = await Procedimentos.find({});

  const procedimentosPromises = procedimentos.map(async (procedimento) => {
    if (procedimento.produtos.includes(produtoId)) {
      procedimento.produtos = procedimento.produtos.filter(
        (produto) => String(produto) !== produtoId
      );
    }
    await procedimento.save();
  });

  await Promise.all(procedimentosPromises);

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
    return next(new AppError('Nenhum produto foi achado com esse ID!', 404));

  res.status(200).json({
    status: 'success',
    data: {
      produto,
    },
  });
});
