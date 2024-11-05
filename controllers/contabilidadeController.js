const catchAsync = require('../utils/catchAsync');
const Contabilidade = require('./../models/contabilidadeModel');

exports.createContabilidade = catchAsync(async (req, res, next) => {
  const contabilidade = await Contabilidade.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      contabilidade,
    },
  });
});

exports.getAllContabilidade = catchAsync(async (req, res, next) => {
  const contabilidades = await Contabilidade.find({});

  res.status(200).json({
    status: 'success',
    data: {
      contabilidade: contabilidades,
    },
  });
});

exports.deleteContabilidade = catchAsync(async (req, res, next) => {
  await Contabilidade.findByIdAndDelete(req.params.contabilidadeID);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateContabilidade = catchAsync(async (req, res, next) => {
  const contabilidade = await Contabilidade.findByIdAndUpdate(
    req.params.contabilidadeID,
    req.body,
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      contabilidade,
    },
  });
});
