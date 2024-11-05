const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  produto: {
    type: String,
    required: [true, 'É preciso indicar o nome do produto!'],
  },
  descricao: {
    type: String,
    required: [true, 'Um produto precisa de uma descrição!'],
  },
  marca: {
    type: String,
    required: [true, 'Um produto precisa de uma marca!'],
  },
  pesoLiquido: {
    type: String,
    required: [true, 'Um produto precisa de um peso líquido!'],
  },
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
