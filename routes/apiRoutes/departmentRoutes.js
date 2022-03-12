const express = require('express');
const router = express.Router();
// const db = require('../../db/connection');
// const inputCheck = require('../../utils/inputCheck');



router.get('/department', (req, res) => {
    res.json({
      message: 'Hello World'
    });
  });
