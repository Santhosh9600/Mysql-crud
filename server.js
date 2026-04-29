const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;

// middleware
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            "http://localhost:3000",
            "https://mysql-crud-alpha.vercel.app"
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true); // allow all temporarily
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.options("*", cors());

app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "santhoshdb"
});

// Connect DB
db.connect((err) => {
    if (err) {
        console.log("Db not Connected....", err);
    } else {
        console.log("Db Connected....");
    }
});

// Home Route
app.get("/", (req, res) => {
    res.send("Server Running...");
});

// Create Table
app.get("/createtable", (req, res) => {
    const sql = `
        CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(100),
            body TEXT
        )
    `;

    db.query(sql, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error creating table");
        }

        res.send("Table Created...");
    });
});

// Add Post
app.post("/addpost", (req, res) => {
    const { title, body } = req.body;

    const sql = "INSERT INTO posts (title, body) VALUES (?, ?)";

    db.query(sql, [title, body], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Insert Error");
        }

        res.send("Post Added...");
    });
});

// Get All Posts
app.get("/getposts", (req, res) => {
    const sql = "SELECT * FROM posts ORDER BY id DESC";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Fetch Error");
        }

        res.json(result);
    });
});

// Get One Post
app.get("/getpost/:id", (req, res) => {
    const sql = "SELECT * FROM posts WHERE id=?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Fetch Error");
        }

        res.json(result);
    });
});

// Update Post
app.put("/updatepost/:id", (req, res) => {
    const { title, body } = req.body;
    const { id } = req.params;

    const sql = "UPDATE posts SET title=?, body=? WHERE id=?";

    db.query(sql, [title, body, id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Update Error");
        }

        res.send("Post Updated...");
    });
});

// Delete Post
app.delete("/deletepost/:id", (req, res) => {
    const sql = "DELETE FROM posts WHERE id=?";

    db.query(sql, [req.params.id], (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Delete Error");
        }

        res.send("Post Deleted...");
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
});