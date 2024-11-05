const mongoose = require('mongoose');

const contabilidadeSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ['receita', 'despesa'],
    required: [
      true,
      'Um registro contábil precisa ser uma receita ou despesa!',
    ],
  },
  valor: {
    type: Number,
    required: [true, 'Um registro contábil precisa de um valor'],
  },
  descricao: {
    type: String,
    required: [true, 'Um registro contábil precisa de uma descrição'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  categoria: {
    type: String,
    required: [true, 'Um registro precisa de uma categoria!'],
  },
  formaPagamento: {
    type: String,
    required: [true, 'Um registro precisa de uma forma de pagamento!'],
  },
});

const Contabilidade = mongoose.model('Contabilidade', contabilidadeSchema);

module.exports = Contabilidade;
