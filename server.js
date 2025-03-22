require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// API GET semua data
app.get("/api/cluster_bencana", (req, res) => {
    db.query("SELECT * FROM cluster_bencana", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(results);
        }
    });
});

// API GET berdasarkan ID
app.get("/api/cluster_bencana/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM cluster_bencana WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else if (results.length === 0) {
            res.status(404).json({ message: "Data not found" });
        } else {
            res.json(results[0]);
        }
    });
});

// API GET semua data dari tabel jenis_bencana
app.get("/api/bencana", (req, res) => {
    db.query("SELECT * FROM bencana", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else {
            res.json(results);
        }
    });
});

// API GET berdasarkan ID dari tabel jenis_bencana
app.get("/api/bencana/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM bencana WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: "Database error" });
        } else if (results.length === 0) {
            res.status(404).json({ message: "Data not found" });
        } else {
            res.json(results[0]);
        }
    });
});

// API GET semua data dari tabel detail_cluster
app.get("/api/detail_cluster", (req, res) => {
    db.query("SELECT * FROM detail_cluster", (err, results) => {
        if (err) {
            console.error("❌ Error Query:", err);
            return res.status(500).json({ error: "Database error", details: err });
        }
        res.json(results);
    });
});

// API GET berdasarkan ID dari tabel detail_cluster
app.get("/api/detail_cluster/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM detail_cluster WHERE cluster = ?", [id], (err, results) => {
        if (err) {
            console.error("❌ Error Query:", err);
            return res.status(500).json({ error: "Database error", details: err });
        } else if (results.length === 0) {
            return res.status(404).json({ message: "Data not found" });
        }
        res.json(results[0]);
    });
});



// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
