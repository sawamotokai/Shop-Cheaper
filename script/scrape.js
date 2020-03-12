const puppeteer = require('puppeteer');

const URL =
	'https://www.amazon.ca/Canon-50mm-Standard-Prime-Lenses-Black/dp/B00009XVCZ/ref=sr_1_1?crid=2UVX9SQYZZUYW&keywords=canon+50mm+1.4&qid=1583630130&sprefix=canon+50%2Caps%2C198&sr=8-1';

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(URL);
	const textContent = await page.evaluate(() => document.querySelector('#price_inside_buybox').textContent);
	console.log(textContent);

	await browser.close();
})();
