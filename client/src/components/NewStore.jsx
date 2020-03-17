import React from 'react';

export const NewStore = () => {
	return (
		<div>
			<form action="/api/store" method="post">
				<div className="storeInfo">
					<label htmlFor="storeName">Online Store Name</label>
					<input type="text" name="storeName" id="storeName" required />
					<label htmlFor="urlPrefix">Store's URL prefix</label>
					<input type="text" name="urlPrefix" id="urlPrefix" required />
				</div>

				<div className="htmlInfo">
					<label htmlFor="htmlTag">HTML Tag</label>
					<input type="text" name="htmlTag" id="htmlTag" required />
					<label htmlFor="htmlId">HTML ID</label>
					<input type="text" name="htmlId" id="htmlId" />
					<label htmlFor="htmlClass">HTML class</label>
					<input type="text" name="htmlClass" id="htmlClass" />
				</div>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};
