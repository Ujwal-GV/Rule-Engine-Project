const express = require('express');
const ruleRouter = express.Router();
const rulesController = require('../controller/RulesController');

ruleRouter.post("/create_rule", rulesController.createRule);
ruleRouter.post("/evaluate_rule", rulesController.evaluateRule);

module.exports = ruleRouter;