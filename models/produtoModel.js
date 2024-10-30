const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  produto: {
    type: String,
    required: [true, 'É preciso indicar o nome do produto!'],
  },
  preco: {
    type: Number,
    required: [true, 'Um produto precisa de um preço!'],
  },
  quantidade: {
    type: Number,
    default: 0,
  },
  validade: {
    type: Date,
    required: [true, 'É preciso indicar a data de validade do produto!'],
  },
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
