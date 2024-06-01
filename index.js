const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db('calculator');
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
    throw e;
  }
}

app.use(async (req, res, next) => {
  try {
    req.db = await connectToMongo();
    next();
  } catch (e) {
    next(e);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

// CRUD endpoints for MongoDB
app.post('/api/operation', async (req, res) => {
  try {
    const { operation, operands, result } = req.body;
    const collection = req.db.collection('operations');
    const insertResult = await collection.insertOne({ operation, operands, result, timestamp: new Date() });
    res.json(insertResult);
  } catch (e) {
    res.status(500).json({ error: 'Failed to save operation to MongoDB', details: e });
  }
});

app.get('/api/operations', async (req, res) => {
  try {
    const collection = req.db.collection('operations');
    const operations = await collection.find({}).toArray();
    res.json(operations);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch operations from MongoDB', details: e });
  }
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
