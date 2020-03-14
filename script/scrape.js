const axios = require('axios');
const puppeteer = require('puppeteer');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

const URL =
	'https://www.amazon.ca/Canon-50mm-Standard-Prime-Lenses-Black/dp/B00009XVCZ/ref=sr_1_1?crid=2UVX9SQYZZUYW&keywords=canon+50mm+1.4&qid=1583630130&sprefix=canon+50%2Caps%2C198&sr=8-1';

const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(URL);
	const res = new Promise((resolve, reject) => {
		con.query('SELECT * FROM item', (error, results, fields) => {
			if (error) return console.error(error);
			console.log(results[0].id);
			resolve(results);
		});
	});
	const items = await res.catch((err) => console.error(err));
	console.log(items);
	// goes over alert table and scrapes all items and sends alle`rts if necessary.
	const textContent = await page.evaluate(() => document.querySelector('#price_inside_buybox').textContent);
	console.log(textContent);
	const reg = /[0-9,.]+/;
	const price = textContent.match(reg)[0].replace(',', '');
	console.log(price);
	// axios.post('/api/item/price', {
	// 	itemId: itemId,
	// 	storeName: storeName,
	// 	price: price
	// });
	await browser.close();
})();
