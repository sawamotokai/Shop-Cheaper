const axios = require('axios');
const puppeteer = require('puppeteer');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: '../server/.env' });

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
	// await page.goto(URL);
	const itemQuery = new Promise((resolve, reject) => {
		con.query('SELECT * FROM item', (error, results, fields) => {
			if (error) return console.error(error);
			resolve(results);
		});
	});
	const items = await itemQuery.catch((err) => console.error(err));
	console.log(items);
	let URLs = [];
	let storeNames = new Set();
	for (let item of items) {
		URLs.push(page.goto(item.item_url));
		storeNames.add(item.store_name);
	}
	let storeNameText = '';
	for (let storeName of storeNames) storeNameText += `"${storeName}", `;
	storeNameText = storeNameText.slice(0, storeNameText.length - 2);
	let q = `SELECT * FROM store WHERE store_name IN (${storeNameText}) ORDER BY store_name`;
	const storeQuery = new Promise((resolve, reject) => {
		con.query(q, (error, results, fields) => {
			if (error) return console.error(error);
			resolve(results);
		});
	});
	let itemPages = await Promise.all(URLs);
	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		item['page'] = itemPages[i];
	}
	let stores = await storeQuery.catch((err) => console.error(err));
	let textData = [];
	console.log(stores);
	for (let item of items) {
		let selector;
		for (let store of stores) {
			if (store.store_name == item.store_name) {
				if (item.html_id != null) selector = `#${item.html_id}`;
				else selector = `${item.html_tag}.${item.html_class}`;
			}
		}
		textData.push(page.evaluate(() => document.querySelector(selector).textContent));
	}
	const texts = await Promise.all(textData);
	// goes over alert table and scrapes all items and sends alle`rts if necessary.
	// const textContent = await page.evaluate(() => document.querySelector('#price_inside_buybox').textContent);
	// console.log(textContent);
	const reg = /[0-9,.]+/;
	const prices = texts.map((text) => text.match(reg)[0].replace(',', ''));
	console.log(prices);

	await browser.close();
})();

// axios.post('/api/item/price', {
// 	itemId: itemId,
// 	storeName: storeName,
// 	price: price
// });
