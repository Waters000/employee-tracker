const express = require('express');
const router = express.Router();
 const db = require('../../db/connection');
// const inputCheck = require('../../utils/inputCheck');


function getRoles() {
const sql = `SELECT * FROM role
LEFT JOIN department ON department.id = role.department_id`          
db.query(sql, (err, result) => {
  if (err)
    throw err
    console.table(result)  
    });
};

module.exports = {getRoles}