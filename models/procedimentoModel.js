const mongoose = require('mongoose');

const procedimentoSchema = new mongoose.Schema({
  procedimento: {
    type: String,
    required: [true, 'É preciso dar um nome para o procedimento!'],
  },
});
