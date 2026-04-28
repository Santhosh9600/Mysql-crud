const express = require("express");
const mysql = require("mysql");
const bodyparse = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;

// middleware
app.use(cors({
    origin: "https://mysql-crud-alpha.vercel.app"
}));

app.use(bodyparse.json());

// MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (!err) {
        console.log("Db Connected....");
    } else {
        console.log("Db not Connected....", err);
    }
});

// Home Route
app.get("/", (req, res) => {
    res.send("Server Running : https://mysql-crud-1-cyw5.onrender.com");
});

// create table
app.get("/createtable", (req, res) => {
    let sql = "CREATE TABLE posts (id INT AUTO_INCREMENT, title VARCHAR(100), body TEXT, PRIMARY KEY(id))";

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send("Error creating table");
        } else {
            res.send("Table Created...");
        }
    });
});

// Insert post
app.post("/addpost", (req, res) => {
    let post = { title: req.body.title, body: req.body.body };
    let sql = "INSERT INTO posts SET ?";

    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send("Post added...");
    });
});

// getPosts
app.get("/getposts", (req, res) => {
    let sql = "select * from posts";

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// get post by id
app.get("/getpost/:id", (req, res) => {
    let sql = "select * from posts where id=?";

    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// update post
app.put("/updatepost/:id", (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;

    const sql = "update posts set title=?,body=? where id=?";

    db.query(sql, [title, body, id], (err, result) => {
        if (err) throw err;
        res.send("post updated..");
    });
});

// delete post
app.delete("/deletepost/:id", (req, res) => {
    const { id } = req.params;
    const sql = "delete from posts where id=?";

    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send("posted deleted");
    });
});

app.listen(port, () => {
    console.log(`server is Running on ${port}`);
});