const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const factoryController = require('./../utils/factoryControllers');

const userHandlers = new factoryController(User, 'user');

exports.createUser = catchAsync(async (req, res, next) => {
  await userHandlers.createData(req, res);
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  await userHandlers.getAllData(res);
});
