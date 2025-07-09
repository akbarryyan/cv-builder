import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    // Cek email
    const [users] = await pool.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Simpan user baru
    const [result] = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)`,
      [firstName, lastName, email, hashed]
    );

    // Ambil data user yang baru saja dibuat
    const [newUserRows] = await pool.query("SELECT * FROM users WHERE id = ?", [
      result.insertId,
    ]);
    const user = newUserRows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, is_premium: user.is_premium },
      process.env.JWT_SECRET || "CqIMGqMxWqeY",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        is_premium: user.is_premium,
        photo_url: user.photo_url,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    // Cari user berdasarkan email
    const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const user = users[0];
    // Cek password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, is_premium: user.is_premium },
      process.env.JWT_SECRET || "CqIMGqMxWqeY",
      { expiresIn: "7d" }
    );
    // Kirim token ke frontend
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        is_premium: user.is_premium,
        photo_url: user.photo_url,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error, please try again" });
  }
};
