const express = require('express');
const pool = require('../db/config'); // Import the pool
 const router_update=express.Router()
 router_update.put('/updateusers/:id', async (req, res) => {
    const { id } = req.params;
    const { email } = req.body; // Assuming you want to update the email
  
    try {
      const updateUserQuery = 'UPDATE tester SET email = $1 WHERE id = $2'; // Using tester table
      await pool.query(updateUserQuery, [email, id]);
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  });
  module.exports=router_update
  