const express = require('express');
const pool = require('../db/config'); // Import the pool

const router_del = express.Router();
router_del.delete('/delusers/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleteUserQuery = 'DELETE FROM tester WHERE id = $1'; // Using tester table
      await pool.query(deleteUserQuery, [id]);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
  });
   module.exports=router_del
  