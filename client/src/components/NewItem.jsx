import React from 'react';
import { useState, useEffect } from 'react';
const axios = require('axios');

export const NewItem = () => {
	const [ stores, setStores ] = useState([]);
	const loadStores = async () => {
		const res = await axios.get('/api/stores'); // what if this fails?
		setStores(res.data.sort());
	};
	useEffect(() => {
		loadStores();
	}, []);

	return (
		<div>
			<form action="/api/item" method="post">
				<label htmlFor="storeDropdown">Online Store Name</label>
				<select id="storeDropdown" name="storeName">
					{stores.map((store) => (
						<option key={store.store_name} value={store.store_name}>
							{store.store_name}
						</option>
					))}
				</select>
				<label htmlFor="itemName">Item Name</label>
				<input type="text" name="itemName" id="itemName" required />
				<label htmlFor="itemURL">Item URL</label>
				<input type="text" name="itemURL" id="itemURL" required />
				<button type="submit">Create</button>
			</form>
		</div>
	);
};
