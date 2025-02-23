require('dotenv').config(); // Load environment variables

// Debugging: Log Environment Variables
console.log("🔹 Loaded Environment Variables:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "********" : "Not Found"); // Mask password for security
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("PORT:", process.env.PORT);
console.log("SECRET_KEY:", process.env.SECRET_KEY ? "Loaded Successfully" : "Not Found");

// Dependencies
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// ✅ Enable CORS with Correct Configuration
app.use(cors({
    origin: "https://awaken11.github.io",  // Allow frontend requests
    methods: ["GET", "POST"],  // Only allow GET and POST requests
    credentials: true
}));

app.use(bodyParser.json());

// ✅ MySQL Database Connection (With Port & Error Handling)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// 🔴 Improved Connection Handling
const connectWithRetry = () => {
    db.connect(err => {
        if (err) {
            console.error("❌ Database Connection Failed! Retrying in 5 seconds...", err);
            setTimeout(connectWithRetry, 5000); // Retry after 5 sec
        } else {
            console.log("✅ Connected to MySQL Database");
        }
    });
};
connectWithRetry();

// 🔴 Check if SECRET_KEY is Loaded
if (!process.env.SECRET_KEY) {
    console.error("❌ SECRET_KEY is missing! Exiting...");
    process.exit(1);
}

const SECRET_KEY = process.env.SECRET_KEY;

// 🟢 Debugging Middleware (Logs Every Request)
app.use((req, res, next) => {
    console.log(`🔹 ${req.method} Request to: ${req.url}`);
    next();
});

// 🟢 User Signup Route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", 
            [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("❌ Database Insert Error:", err);
                return res.status(500).json({ message: "User already exists or database error" });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        console.error("❌ Password Hashing Error:", err);
        res.status(500).json({ message: "Error hashing password" });
    }
});

// 🔵 User Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
            console.error("❌ Database Query Error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    });
});

// 🟢 Start the Server with Error Handling
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on("error", err => {
    console.error("❌ Server Error:", err);
});
