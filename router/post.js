const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import JWT for token generation
const pool = require("../db/config"); // Import the pool

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Signup route
router.post("/signup", async (req, res) => {
});

// Login route
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const getUserQuery = "SELECT * FROM tester WHERE email = $1";
    const userResult = await pool.query(getUserQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const storedPassword = userResult.rows[0].password;
    const passwordMatch = await bcrypt.compare(password, storedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: userResult.rows[0].id }, "your-secret-key", {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ message: "Login successful", token, redirect: "/"  });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

module.exports = router;
