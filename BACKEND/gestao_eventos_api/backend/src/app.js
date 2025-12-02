const express = require('express');
const router = require('./router');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', router);

app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

module.exports = app;
