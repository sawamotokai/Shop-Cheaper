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
			if (error) return console.error(error);
			resolve(results);
		});
	});
	const items = await itemQuery.catch((err) => console.error(err));

	for (let item of items) {
		await page.goto(item.item_url);

		var selector = '';
		if (item.html_id != null) selector = `#${item.html_id}`;
		else selector = `${item.html_tag}.${item.html_class}`;
		console.log(selector);

		const textContent = await page
			.evaluate((selector) => document.querySelector(selector).textContent, selector)
			.catch((err) => console.error(err));
		// const textContent = await page.evaluate(() => document.querySelector('#price_inside_buybox').textContent);

		console.log(textContent);
		const reg = /[0-9,.]+/;
		const price = textContent.match(reg)[0].replace(',', '');
		console.log(price);
	}

	await browser.close();
})();

// axios.post('/api/item/price', {
// 	itemId: itemId,
// 	storeName: storeName,
// 	price: price
// });
