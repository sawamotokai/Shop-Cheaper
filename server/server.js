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

const PORT = 1000;
app.listen(process.env.PORT || PORT, () => {
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

app.post('/api/item/price', (req, res) => {
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

app.post('/api/store', (req, res) => {
	const { columns, values } = makeQueryForStore(req.body);
	const q = `INSERT INTO store (${columns}) VALUES (${values})`;
	con.query(q, (err, result) => {
		if (err) console.error(err);
		else {
			console.log(result);
			res.status(200).json(result);
		}
	});
});

const makeQueryForStore = ({ storeName, urlPrefix, htmlTag, htmlId, htmlClass }) => {
	let values = `${storeName}, ${urlPrefix}`;
	if (htmlTag) values += `, ${htmlTag}`;
	if (htmlId) values += `, ${htmlId}`;
	if (htmlClass) values += `, ${htmlClass}`;

	let columns = `store_name, url_prefix`;
	if (htmlTag) columns += `, html_tag`;
	if (htmlId) columns += `, html_id`;
	if (htmlClass) columns += `, html_class`;
	return { columns: columns, values: values };
};
