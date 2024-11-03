const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'college',
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.post('/register', async (req, res) => {
    const { phone, password } = req.body;
    // Hash the password if you are storing it securely
    try {
        const query = 'INSERT INTO users (phone, password) VALUES (?, ?)';
        db.query(query, [phone, password], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.json({ message: 'Phone number already registered' });
                }
                throw err;
            }
            res.json({ message: 'Registration successful' });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error connecting to server' });
    }
});


app.post('/login', async (req, res) => {
    const { phone, password } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE phone = ? AND password = ?';
        db.query(query, [phone, password], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.json({ message: 'Login successful' });
            } else {
                res.json({ message: 'Invalid phone number or password' });
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error connecting to server' });
    }
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
