class Alert {
	constructor(id, user_id, store_id, item_id, price_limit, last_notified) {
		this.id = id;
		this.user_id = user_id;
		this.store_id = store_id;
		this.item_id = item_id;
		this.price_limit = price_limit;
		this.last_notified;
	}

	static getAlert(id) {
		axios.get('/alert/id');
	}
}
