const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    type : {
        type: String,
        required: true,
    },
    left : {
        type: mongoose.Schema.Types.Mixed, default: null,
    },
    right: {
        type: mongoose.Schema.Types.Mixed, default: null,
    },
    value: {
        type: mongoose.Schema.Types.Mixed, default: null,
    }
});

const RuleSchema = new mongoose.Schema({
    ruleName: {
        type: String,
        required: true,
    },
    ast: {
        type: NodeSchema,
        required: true,
    }
});

const Rule = mongoose.model("Rule", RuleSchema);
module.exports = Rule;