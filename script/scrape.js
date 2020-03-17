const axios = require('axios');
const puppeteer = require('puppeteer');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: '../server/.env' });

const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	const itemQuery = new Promise((resolve, reject) => {
		con.query('SELECT * FROM item i, store s WHERE i.store_name = s.store_name', (error, results, fields) => {
			if (error) return reject(error);
			resolve(results);
		});
	});
	const items = await itemQuery.catch((err) => console.error(err));

	let data = [];
	for (let item of items) {
		await page.goto(item.item_url);

		var selector = '';
		if (item.html_id != null) selector = `#${item.html_id}`;
		else selector = `${item.html_tag}.${item.html_class}`;
		const textContent = await page
			.evaluate((selector) => document.querySelector(selector).textContent, selector)
			.catch((err) => console.error(err));
		const reg = /[0-9,.]+/;
		const price = textContent.match(reg)[0].replace(',', '');
		console.log(`Price of ${item.item_name} \n on ${item.store_name} is ${price} currently.\n`);
		data.push([ item.store_name, item.id, price ]);
	}
	let priceQuery = new Promise((resolve, reject) => {
		con.query(`INSERT INTO item_price (store_name, item_id, price) VALUES ?`, [ data ], (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
	const res = await priceQuery;
	// console.log(res);

	await browser.close();
})().then(() => {
	process.exit(0);
});
