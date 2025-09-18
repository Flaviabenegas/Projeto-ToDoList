const express = require('express')
const app = express()
const connectDB = require('./src/config/database');

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.send('API de Tarefas está funcionando!');
});



module.exports = app;

