const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validateCPF = require('./../utils/validateCPF');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    maxLength: [256, 'O nome tem mais caracteres do que o permitido'],
    required: [true, 'Um usuário precisa de um nome!'],
  },
  cpf: {
    type: String,
    unique: [true, 'CPF deve ser único!'],
    required: [true, 'Um usuário precisa de um CPF'],
    validate: {
      validator: (value) => validateCPF(value),
      message: ({ value }) => `${value} não é um CPF válido!`,
    },
  },
  role: {
    type: String,
    enum: ['cabelereiro', 'secretario', 'cliente'],
    required: [true, 'Um usuário precis de um tipo'],
    default: 'cliente',
  },
  email: {
    type: String,
    unique: [true, 'Esse email já existe!'],
    validate: validator.isEmail,
  },
  celular: {
    type: String,
    required: [true, 'Um usuário precisa de um celular'],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, 'A Password should have more than 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: true,
    select: false,
    minlength: [8, 'A password confirm should be longer than 8 characters'],
    validate: {
      validator: function (field) {
        return field === this.password;
      },
      message: 'Passwords should match',
    },
  },
  especialidades: {
    type: [String],
    enum: [
      'cabelereiro geral',
      'barbeiro',
      'especialista corte',
      'colorista',
      'especialista de escova',
      'especialista de alisamento',
      'especialista em penteados',
      'extensionista',
      'designer de sombrancelha',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: true,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (this.role === 'cliente') this.especialidades = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  reqPassword,
  userPassword
) {
  return await bcrypt.compare(reqPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
