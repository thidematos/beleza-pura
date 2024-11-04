const express = require('express');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/login').post(authController.login);

router.route('/validate').get(authController.protect, authController.validate);

module.exports = router;
