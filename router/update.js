const express = require('express');
const pool = require('../db/config'); // Import the pool
const router_update = express.Router();

router_update.put('/updateusers/:id', async (req, res) => {
  const { id } = req.params;
  const { email, username, password } = req.body; // Update email, username, and password

  try {
    // Update the query to include username and password
    const updateUserQuery =
      'UPDATE tester SET email = $1, username = $2, password = $3 WHERE id = $4';

    await pool.query(updateUserQuery, [email, username, password, id]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

module.exports = router_update;
