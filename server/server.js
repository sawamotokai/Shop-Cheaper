const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
app.use(express.json());

dotenv.config();

const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
	res.send('welcome');
});

app.get('/api/users', (req, res) => {
	con.query('SELECT * FROM user', (error, results, fields) => {
		if (error) throw error;
		console.log(results[0].id);
		res.status(200).json(results);
	});
});

app.post('/api/store/item/price', (req, res) => {
	const { itemId, storeName, price } = req.body;
	const q = `INSERT INTO item_price (item_id, storeName, price) VALUES (${itemId}, "${storeName}", ${price})`;
	con.query(q, (err, result) => {
		if (err) console.error(err);
		else {
			console.log(result);
			res.status(200).json(result);
		}
	});
});
