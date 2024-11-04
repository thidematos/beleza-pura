const mongoose = require('mongoose');

const agendamentoSchema = new mongoose.Schema({
  nome: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Um agendamento precisa de um cliente!'],
  },
  status: {
    type: String,
    enum: ['confirmado', 'pendente', 'cancelado'],
    default: 'pendente',
  },
  quando: {
    type: Date,
    required: [true, 'Um agendamento precisa ser em um dia!'],
  },
  procedimentos: {
    type: [mongoose.Schema.Types.ObjectId],
    required: [true, 'Escolha pelo menos um procedimento para ser realizado!'],
  },
  cabelereiro: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Agendamento = mongoose.model('Agendamento', agendamentoSchema);

module.exports = Agendamento;
