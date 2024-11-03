const mongoose = require('mongoose');

const equipamentoSchema = new mongoose.Schema({
  equipamento: {
    type: String,
    required: [true, 'Um equipamento precisa de um tipo!'],
  },
  preco: {
    type: Number,
    required: [true, 'Um equipamento precisa de um preço!'],
  },
  quantidade: {
    type: Number,
    required: [true, 'Um equipamento precisa de uma quantidade!'],
    min: [1, 'Você precisa de pelo menos um equipamento para cadastrar!'],
  },
  marca: {
    type: String,
    required: [true, 'Um equipamento precisa de uma marca!'],
  },
});

const Equipamento = mongoose.model('Equipamento', equipamentoSchema);

module.exports = Equipamento;
