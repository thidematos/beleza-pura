const catchAsync = require('../utils/catchAsync');
const Equipamento = require('./../models/equipamentoModel');

const Controller = require('./../utils/factoryControllers');

const EquipamentoController = new Controller(Equipamento, 'equipamento');

exports.getAllEquipamentos = catchAsync(async (req, res, next) => {
  await EquipamentoController.getAllData(res);
});

exports.createEquipamento = catchAsync(async (req, res, next) => {
  await EquipamentoController.createData(req, res);
});

exports.deleteEquipamento = catchAsync(async (req, res, next) => {
  await EquipamentoController.deleteData(req, res, req.params.equipamentoID);
});

exports.updateEquipamento = catchAsync(async (req, res, next) => {
  await EquipamentoController.updateDate(req, res, req.params.equipamentoID);
});
