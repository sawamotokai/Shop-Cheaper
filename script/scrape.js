const axios = require('axios');
const cheerio = require('cheerio');

const URL =
	'https://www.amazon.ca/Canon-50mm-Standard-Prime-Lenses-Black/dp/B00009XVCZ/ref=sr_1_1?crid=2UVX9SQYZZUYW&keywords=canon+50mm+1.4&qid=1583630130&sprefix=canon+50%2Caps%2C198&sr=8-1';

// (async () => {
// 	const html = await axios.get(URL).catch((err) => console.error(err));
// 	console.log(html);
// 	const $ = cheerio.load(html.data);
// 	// const price = $('#price_inside_buybox');
// 	const price = $('h2');
// 	// console.log(price);
// })();
