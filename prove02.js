const path = require('path');
const express = require('express');

const mainRoutes = require('./routes/index02');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRoutes);

app.listen(3000);
console.log('listening on 3000');