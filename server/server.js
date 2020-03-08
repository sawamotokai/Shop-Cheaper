const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
app.use(express.json());

dotenv.config();

const con = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USERNAME,
	password: process.env.PASSWORD,
	database: process.env.DB_NAME
});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
	res.send('Hey Jude');
});
