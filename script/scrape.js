const axios = require('axios');
const puppeteer = require('puppeteer');

const URL =
	'https://www.amazon.ca/Canon-50mm-Standard-Prime-Lenses-Black/dp/B00009XVCZ/ref=sr_1_1?crid=2UVX9SQYZZUYW&keywords=canon+50mm+1.4&qid=1583630130&sprefix=canon+50%2Caps%2C198&sr=8-1';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(URL);
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
