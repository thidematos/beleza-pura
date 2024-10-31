const catchAsync = require('../utils/catchAsync');
const Equipamento = require('./../models/equipamentoModel');

const Controller = require('./../utils/factoryControllers');

const EquipamentoController = new Controller(Equipamento, 'equipamento');

exports.getAllEquipamentos = catchAsync(async (req, res, next) => {
  await EquipamentoController.getAllData(res);
});
