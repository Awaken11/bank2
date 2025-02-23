require('dotenv').config(); // Load environment variables

const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Validate Required Environment Variables
const REQUIRED_ENV_VARS = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT", "SECRET_KEY"];
REQUIRED_ENV_VARS.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ ERROR: Missing required environment variable: ${key}`);
        process.exit(1); // Stop the server if critical variables are missing
    }
});

// ✅ Debugging: Log Loaded Environment Variables
console.log("🔹 Loaded Environment Variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "********" : "Not Found"); // Mask password
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("PORT:", process.env.PORT || 5000);
console.log("SECRET_KEY:", process.env.SECRET_KEY ? "Loaded Successfully" : "Not Found");

// ✅ MySQL Database Connection with Auto-Retry
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectTimeout: 10000 // 10 seconds timeout
};

function connectDatabase() {
    const db = mysql.createConnection(dbConfig);

    db.connect(err => {
        if (err) {
            console.error("❌ Database Connection Failed:", err.message);
            console.log("🔄 Retrying in 5 seconds...");
            setTimeout(connectDatabase, 5000); // Retry connection after 5 seconds
        } else {
            console.log("✅ Connected to MySQL Database");
        }
    });

    // Handle MySQL disconnection
    db.on("error", err => {
        console.error("⚠️ MySQL Error:", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.log("🔄 Reconnecting...");
            connectDatabase(); // Reconnect on lost connection
        }
    });

    return db;
}

const db = connectDatabase();

// ✅ Secret Key for JWT Authentication
const SECRET_KEY = process.env.SECRET_KEY;

// 🟢 User Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) 
        return res.status(400).json({ message: "All fields are required" });

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", 
            [username, email, hashedPassword], (err, result) => {
            if (err) 
                return res.status(500).json({ message: "User already exists or database error" });

            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        res.status(500).json({ message: "Error hashing password" });
    }
});

// 🔵 User Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) 
        return res.status(400).json({ message: "All fields are required" });

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Database error" });

        if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    });
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
