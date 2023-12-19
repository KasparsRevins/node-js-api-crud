const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db/config"); // Import the pool

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/signup", async (req, res) => {
  const { username, surname, email, password } = req.body;

  try {
    // Check if user already exists in the database
    const existingUserQuery = "SELECT * FROM tester WHERE email = $1";
    const existingUserResult = await pool.query(existingUserQuery, [email]);

    if (existingUserResult.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user to the database
    const insertUserQuery =
      "INSERT INTO tester (username, surname,email, password) VALUES ($1, $2, $3, $4) RETURNING *";
    const newUserResult = await pool.query(insertUserQuery, [
      username,
      surname,
      email,
      hashedPassword,
    ]);

    const newUser = newUserResult.rows[0];
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

module.exports = router;
