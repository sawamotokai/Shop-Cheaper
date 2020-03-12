import React from 'react';
import { useState, useEffect } from 'react';
const axios = require('axios');

export const NewItem = () => {
	const [ stores, setStores ] = useState([]);
	const loadStores = async () => {
		const res = await axios.get('/api/stores');
		setStores(res.data);
	};
	useEffect(() => {
		loadStores();
	}, []);

	return (
		<div>
			<form action="/api/store" method="post">
				<label htmlFor="storeDropdown">Online Store Name</label>
				<select id="storeDropdown">
					{stores.map((store) => (
						<option key={store.store_name} value={store.store_name}>
							{store.store_name}
						</option>
					))}
				</select>

				<label htmlFor="itemURL">Item's URL</label>
				<input type="text" name="itemURL" id="itemURL" required />
				<button type="submit">Create</button>
			</form>
		</div>
	);
};
