import express from 'express';
import dotenv from 'dotenv';
import { connectToPool } from './db/dbconfig.js';

dotenv.config();

const port = process.env.PORT || 5001;
const app = express();


app.get('/', (req, res) => {
	res.send('Hello World!');
});

connectToPool().then(() => {
	app.listen(port, () => {
		console.log(`server started on port ${port}`);
	});
});
