import { DB } from '../db/dbHelpers.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import {
	validateRegisterSchema,
	validateloginSchema,
	validateUpdatePassword,
} from '../validators/userValidators.js';
import { generateAccessToken } from '../middlewares/index.js';
// import { sendResetLink } from '../EmailService/sendResetLink.js';
import dotenv from 'dotenv';
dotenv.config();

export const registerUser = async (req, res) => {
	try {
		const { error } = validateRegisterSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		const userId = uuidv4();
		const { username, password, email } = req.body;
		const hashedPassword = await bcrypt.hash(password, 10);
		 await DB.exec('spRegisterUser', {userId, username, password:hashedPassword, email });
		return res.status(201).json({  message: "User created successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const loginUser = async (req, res) => {
	try {
		const { error } = validateloginSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
		const { email, password } = req.body;
		const response = await DB.exec('spGetUser', { email });
		const user = response.recordset[0];
		if (!user) {
			return res.status(400).json({ error: 'Invalid username or password' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid username or password' });
		}
		// Store user data in the session
		req.session.userId = user.userId;
		req.session.email = user.email;
		req.session.username = user.username;
		req.session.isLoggedIn = true;

		const token = generateAccessToken(user);

		const User = { ...user, password: undefined };

		return res.status(200).json({ message: ' login successful', User, token });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const logoutUser = (req, res) => {
	try {
		// Clear the user's session (if you're using sessions)
		if (req.session) {
			req.session.destroy(err => {
				if (err) {
					console.error('Error destroying session:', err);
				}
				// Redirect or send a response after logout
				// res.redirect('/login'); // Redirect to the login page, for example
				res.status(200).json({ message: 'Logout successful' });
			});
		} else {
			// If you're using JWT tokens, you can simply clear the token on the client-side
			res.clearCookie('token'); // Clear the token cookie
			res.status(200).json({ message: 'Logout successful' });
		}
	} catch (error) {
		console.error('Logout error:', error);
		res.status(500).json({ error: 'An error occurred during logout' });
	}
};
