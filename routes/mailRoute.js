const app = require('express')();

const envio = require('../module/conectMail');

app.post('/envio', envio.sendMail);

module.exports = app;