const express = require('express');
const pool = require('../db/config');

const router_get = express.Router();
router_get.get('/getusers', async (req, res) => {
    try {
      const getUsersQuery = 'SELECT * FROM tester';
      const users = await pool.query(getUsersQuery);
      res.status(200).json(users.rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
  });
  
module.exports = router_get;