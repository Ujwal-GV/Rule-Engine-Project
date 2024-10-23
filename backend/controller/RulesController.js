const Rule = require('../model/RuleSchema');

const parseRuleStringToAST = (ruleString) => {
  return {
    type: 'operator',
    value: 'AND',
    left: {
      type: 'operand',
      value: { attribute: 'age', operator: '>', target: 30 }
    },
    right: {
      type: 'operand',
      value: { attribute: 'salary', operator: '>', target: 50000 }
    }
  };
};

exports.createRule = async (req, res) => {
  const { ruleString, ruleName } = req.body;
  const ast = parseRuleStringToAST(ruleString);

  const newRule = new Rule({ ruleName, ast });

  try {
    const savedRule = await newRule.save();
    res.json(savedRule);
  } catch (err) {
    res.status(500).json({ error: 'Error saving rule' });
  }
};

exports.evaluateRule = async (req, res) => {
  const { ruleId, attributes } = req.body;

  try {
    const rule = await Rule.findById(ruleId);
    if(!rule){
        res.status(500).json({ error: "Please enter a valid Rule ID" });
    }

    const evaluateAST = (node, attributes) => {
      if (node.type === 'operand') {
        const { attribute, operator, target } = node.value;
        const value = attributes[attribute];

        if (operator === '>') return value > target;
        if (operator === '<') return value < target;
        if (operator === '=') return value === target;
      } else if (node.type === 'operator') {
        const leftResult = evaluateAST(node.left, attributes);
        const rightResult = evaluateAST(node.right, attributes);

        if (node.value === 'AND') return leftResult && rightResult;
        if (node.value === 'OR') return leftResult || rightResult;
      }
    };

    const result = evaluateAST(rule.ast, attributes);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Error evaluating rule" });
  }
};
