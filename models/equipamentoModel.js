const mongoose = require('mongoose');

const equipamentoSchema = new mongoose.Schema({
  equipamento: {
    type: String,
    required: [true, 'Um equipamento precisa de um tipo!'],
  },
  marca: {
    type: String,
    required: [true, 'Um equipamento precisa de uma marca!'],
  },
  voltagem: {
    type: String,
  },
  dataAquisicao: {
    type: Date,
  },
});

const Equipamento = mongoose.model('Equipamento', equipamentoSchema);

module.exports = Equipamento;
