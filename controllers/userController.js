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

exports.deleteUser = catchAsync(async (req, res, next) => {
  await userHandlers.deleteData(req, res, req.params.userID);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  await userHandlers.updateDate(req, res, req.params.userID);
});
