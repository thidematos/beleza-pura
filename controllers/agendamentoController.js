const FactoryController = require('./../utils/factoryControllers');
const Agendamento = require('./../models/agendamentoModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const agendamentoHandlers = new FactoryController(Agendamento, 'agendamento');

exports.getAllAgendamentos = catchAsync(async (req, res, next) => {
  const agendamentos = await Agendamento.find({});

  res.status(200).json({
    status: 'success',
    data: {
      agendamento: agendamentos,
    },
  });
});

exports.createAgendamento = catchAsync(async (req, res, next) => {
  await agendamentoHandlers.createData(req, res);
});

exports.updateAgendamento = catchAsync(async (req, res, next) => {
  await agendamentoHandlers.updateDate(req, res, req.params.agendamentoID);
});

exports.confirmSchedule = catchAsync(async (req, res, next) => {
  console.log('agendamentoID', req.params.agendamentoID);

  console.log('status', req.body.status);

  const updatedAgendamento = await Agendamento.findByIdAndUpdate(
    req.params.agendamentoID,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      agendamento: updatedAgendamento,
    },
  });
});

exports.deleteAgendamento = catchAsync(async (req, res, next) => {
  const agendamento = await Agendamento.findById(req.params.agendamentoID);

  if (agendamento.status !== 'cancelado')
    return next(new AppError('Cancele um agendamento para excluí-lo!', 400));

  await agendamento.deleteOne();

  res.status(204).json({
    status: 'success',
    data: {
      agendamento: null,
    },
  });
});
