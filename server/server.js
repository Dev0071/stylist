import express from 'express';
import  'express-session';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import friendRequestRouter from './routes/friendRequests.js';
import commentRouter from './routes/commentsRoutes.js';
import { connectToPool } from './db/dbconfig.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import crypto from 'crypto';

dotenv.config();

const port = process.env.PORT || 5001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const secret = crypto.randomBytes(20).toString('hex');
app.use(
	session({
		secret: secret, 
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	}),
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/friendrequests', friendRequestRouter);


app.get('/', (req, res) => {
	res.send('Hello World!');
});

connectToPool().then(() => {
	app.listen(port, () => {
		console.log(`server started on port ${port}`);
	});
});
