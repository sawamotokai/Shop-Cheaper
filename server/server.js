const express = require('express');
const app = express();

app.use(express.json());

const port = 4000;
app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});

app.get('/', (req, res) => {
	res.send('Hey Jude');
});
