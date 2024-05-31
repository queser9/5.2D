const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// Addition endpoint
app.post('/api/add', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const result = num1 + num2;
  res.json({ result });
});

// Subtraction endpoint
app.post('/api/subtract', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const result = num1 - num2;
  res.json({ result });
});

// Multiplication endpoint
app.post('/api/multiply', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const result = num1 * num2;
  res.json({ result });
});

// Division endpoint
app.post('/api/divide', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  if (num2 === 0) {
    return res.status(400).json({ error: 'Division by zero' });
  }

  const result = num1 / num2;
  res.json({ result });
});

// Exponentiation endpoint
app.post('/api/power', (req, res) => {
  const base = parseFloat(req.body.base);
  const exponent = parseFloat(req.body.exponent);

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  const result = Math.pow(base, exponent);
  res.json({ result });
});

// Square root endpoint
app.post('/api/sqrt', (req, res) => {
  const num = parseFloat(req.body.num);

  if (isNaN(num)) {
    return res.status(400).json({ error: 'Invalid parameter' });
  }

  if (num < 0) {
    return res.status(400).json({ error: 'Negative number' });
  }

  const result = Math.sqrt(num);
  res.json({ result });
});

// Modulo endpoint
app.post('/api/modulo', (req, res) => {
  const dividend = parseFloat(req.body.dividend);
  const divisor = parseFloat(req.body.divisor);

  if (isNaN(dividend) || isNaN(divisor)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  if (divisor === 0) {
    return res.status(400).json({ error: 'Division by zero' });
  }

  const result = dividend % divisor;
  res.json({ result });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Calculator microservice is running on port ${port}`);
});
