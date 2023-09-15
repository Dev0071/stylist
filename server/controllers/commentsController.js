import { v4 as uuidv4 } from 'uuid';
import { DB } from '../db/dbHelpers.js';

// create a comment
export const createComment = async (req, res) => {
	try {
		const { postId, userId, comment } = req.body;

		if (!postId || !userId || !comment) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const commentId = uuidv4();
		const response = await DB.exec('spCreateComment', {
			commentId,
			whoCommentedId: userId,
			whichPostId: postId,
			commentDetails: comment,
		});

		if (response.rowsAffected[0] === 1) {
			return res.status(201).json({ message: 'Comment created successfully' });
		} else {
			return res.status(500).json({ error: 'Failed to create comment' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getComments = async (req, res) => {
	try {
		const { postId } = req.params;

		if (!postId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const response = await DB.exec('spGetComments', { postId });

		if (response.rowsAffected[0] >= 1) {
			return res.status(200).json(response.recordset);
		} else {
			return res.status(404).json({ error: 'No comments found' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const deleteComment = async (req, res) => {
	try {
		const { commentId } = req.params;

		if (!commentId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const response = await DB.exec('spDeleteComment', { commentId });

		if (response.rowsAffected[0] === 1) {
			return res.status(200).json({ message: 'Comment deleted successfully' });
		} else {
			return res.status(404).json({ error: 'Comment not found' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const commentOnComment = async (req, res) => {
	try {
		const { commentId, userId, comment } = req.body;

		if (!commentId || !userId || !comment) {
			return res.status(400).json({ error: 'Missing required fields' });
		}
		const commentOnCommentId = uuidv4();
		const response = await DB.exec('spCommentOnComment', {
			commentOnCommentId,
			 commentId,
			 whoCommentedId:userId,
			 commentDetails:comment,
		});

		if (response.rowsAffected[0] === 1) {
			return res.status(201).json({ message: 'Comment created successfully' });
		} else {
			return res.status(500).json({ error: 'Failed to create comment' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getCommentsOnComment = async (req, res) => {
	try {
		const { commentId } = req.params;

		if (!commentId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const response = await DB.exec('spGetCommentsOnComment', { commentId });

		if (response.rowsAffected[0] >= 1) {
			return res.status(200).json(response.recordset);
		} else {
			return res.status(404).json({ error: 'No comments found' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const deleteCommentOnComment = async (req, res) => {
	try {
		const { commentOnCommentId } = req.params;

		if (!commentOnCommentId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const response = await DB.exec('spDeleteCommentOnComment', { commentOnCommentId });

		if (response.rowsAffected[0] === 1) {
			return res.status(200).json({ message: 'Comment deleted successfully' });
		} else {
			return res.status(404).json({ error: 'Comment not found' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};