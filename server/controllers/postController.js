// Import necessary dependencies and models
import { DB } from '../db/dbHelpers.js';
import { v4 as uuidv4 } from 'uuid';


export const createPost = async (req, res) => {
	try {
		const { whoPostedId, media, details } = req.body;

        if (!whoPostedId || !details) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

		const postId = uuidv4();

		const response = await DB.exec('spCreatePost', {
			postId,
			whoPostedId,
			media: media || null,
			details,
		});

		if (response.rowsAffected[0] === 1) {
			return res.status(201).json({ message: 'Post created successfully' });
		} else {
			return res.status(500).json({ error: 'Failed to create post' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const getPosts = async (req, res) => {
	try {
		const response = await DB.exec('spGetPosts');
		const posts = response.recordset;
		return res.status(200).json({ posts });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};


export const savePost = async (req, res) => {
	try {
		const { postId, userId } = req.body;

		if (!postId || !userId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}
		
		const itemId = uuidv4();
		const response = await DB.exec('spSavePost', {
			itemId,
			whosewardrobeId:userId,
			whichPostId:postId,
		});

		if (response.rowsAffected[0] === 1) {
			return res.status(201).json({ message: 'Post saved successfully' });
		} else {
			return res.status(500).json({ error: 'Failed to save post' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

export const getSavedPosts = async (req, res) => {
	try {
		const { userId } = req.body;

		if (!userId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}
		
		const response = await DB.exec('spGetSavedPosts', {
			whosewardrobeId:userId,
		});
		const posts = response.recordset;
		return res.status(200).json({ posts });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const deletePost = async (req, res) => {
	try {
		const { id } = req.params;
	

		const postId = id;

		if (!postId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const response = await DB.exec('spDeletePost', {
			postId,
		});

		if (response.rowsAffected[0] === 1) {
			return res.status(200).json({ message: 'Post deleted successfully' });
		} else {
			return res.status(500).json({ error: 'Failed to delete post' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const likePost = async (req, res) => {
	try {
		const { postId, userId } = req.body;

		if (!postId || !userId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const response = await DB.exec('spLikeOrUnlikePost', {
			postId,
			userId,
		});

		if (response.rowsAffected[0] === 1) {
			return res.status(200).json({ message: response.recordset[0].message });
		} else {
			return res.status(500).json({ error: 'Failed to like post' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export const likesCount = async (req, res) => {
	try {
		const { postId } = req.body;
		const likeCount = 0;

		if (!postId) {
			return res.status(400).json({ error: 'Missing required fields' });
		}

		const response = await DB.exec('spCountPostLikes', {
			postId, likeCount
		});
		if (response.rowsAffected[0] === 1) {
			return res.status(200).json({ likesCount: response.recordset[0].likeCount });
		} else {
			return res.status(500).json({ error: 'Failed to get likes count' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};