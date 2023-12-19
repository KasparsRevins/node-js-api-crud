const express = require("express");
const pool = require("../db/config");
const router_update = express.Router();

router_update.put("/updateusers/:id", async (req, res) => {
  const { id } = req.params;
  const { email, surname, username, password } = req.body; 

  try {
    const updateUserQuery =
      "UPDATE tester SET email = $1, username = $2, surname = $3, password = $4 WHERE id = $5";

    await pool.query(updateUserQuery, [email, username, surname, password, id]);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
});

module.exports = router_update;
