import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { DB } from '../db/dbHelpers.js';
dotenv.config();

export const authenticateToken = (req, res, next) => {
	const authHeaders = req.headers['authorization'];

	const token = authHeaders && authHeaders.split(' ')[1];

	if (token == null) {
		return res.status(401).json({ message: 'No Token Provided' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err instanceof jwt.TokenExpiredError) {
			return res.sendStatus(403).json({ message: 'Token expired' });
		}
		if (err) {
			return res.sendStatus(403).json({ message: err });
		}
		req.info = decoded;

		next();
	});
};

export const generateAccessToken = user => {
	const payload = {
		issuer: user.user_id,
		subject: user.u_name,
		email: user.email,
	};

	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '1630679999',
	});
};

export const checkUser = (req, res, next) => {
	const authHeaders = req.headers['authorization'];

	const token = authHeaders && authHeaders.split(' ')[1];

	if (token == null) {
		next();
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err instanceof jwt.TokenExpiredError) {
			return res.sendStatus(403).json({ message: 'Token expired' });
		}
		if (err) {
			return res.sendStatus(403).json({ message: err });
		}
		req.info = decoded;

		next();
	});
};