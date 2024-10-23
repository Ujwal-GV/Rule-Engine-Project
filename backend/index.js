const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ruleRouter = require('./routes/ruleRouter');
const connectDB = require('./connection');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/rules", ruleRouter);

app.get('/', (req, res) => {
    res.send('Node.js MVC Rule Engine is running!');
  });

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});