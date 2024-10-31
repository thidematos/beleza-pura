const express = require('express');
const equipamentoController = require('./../controllers/equipamentoController');

const router = express.Router();

router.route('/').get(equipamentoController.getAllEquipamentos);

module.exports = router;
