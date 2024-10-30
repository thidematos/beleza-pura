const mongoose = require('mongoose');

const procedimentoSchema = new mongoose.Schema({
  procedimento: {
    type: String,
    required: [true, 'É preciso dar um nome para o procedimento!'],
  },
  preco: {
    type: Number,
    required: [true, 'Um procedimento precisa de um preço'],
  },
  duracao: {
    type: Number,
    required: [true, 'Um procedimento precisa de uma duração'],
  },
  produtos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Produto',
  },
});

const Produto = mongoose.model('Procedimento', procedimentoSchema);

module.exports = Produto;
