const express = require('express');
const agendamentoController = require('./../controllers/agendamentoController');

const router = express.Router();

router
  .route('/')
  .get(agendamentoController.getAllAgendamentos)
  .post(agendamentoController.createAgendamento);

router
  .route('/:agendamentoID')
  .delete(agendamentoController.deleteAgendamento)
  .patch(agendamentoController.updateAgendamento);

router.patch('/confirm/:agendamentoID', agendamentoController.confirmSchedule);

module.exports = router;
