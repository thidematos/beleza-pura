const Procedimento = require('./../models/procedimentoModel');
const Produto = require('./../models/produtoModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllProcedimentos = catchAsync(async (req, res, next) => {
  const procedimentos = await Procedimento.find({});

  res.status(200).json({
    status: 'success',
    data: {
      procedimento: procedimentos,
    },
  });
});

exports.getSingleProcedimento = catchAsync(async (req, res, next) => {
  const procedimento = await Procedimento.findById(req.params.procedimentoID);

  if (!procedimento)
    return new AppError('Não encontramos nenhum procedimento com esse ID', 404);

  res.status(200).json({
    status: 'success',
    data: {
      procedimento,
    },
  });
});

exports.updateProcedimento = catchAsync(async (req, res, next) => {
  const { procedimento, preco, duracao, produtos } = req.body;

  const updatedProcedimento = await Procedimento.findByIdAndUpdate(
    req.params.procedimentoID,
    { procedimento, preco, duracao, produtos },
    { new: true }
  );

  if (!updatedProcedimento)
    return new AppError('Houve um erro na atualização', 400);

  res.status(200).json({
    status: 'success',
    data: {
      procedimento: updatedProcedimento,
    },
  });
});

exports.deleteProcedimento = catchAsync(async (req, res, next) => {
  await Procedimento.findByIdAndDelete(req.params.procedimentoID);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createProcedimento = catchAsync(async (req, res, next) => {
  const { procedimento, preco, duracao, produtos } = req.body;

  const newProcedimento = await Procedimento.create({
    procedimento,
    preco,
    duracao,
    produtos,
  });

  res.status(201).json({
    status: 'success',
    data: {
      procedimento: newProcedimento,
    },
  });
});
