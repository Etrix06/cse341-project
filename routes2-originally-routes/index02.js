const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index02.html'));
});

router.get('/users', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'users02.html'));
});

module.exports = router;