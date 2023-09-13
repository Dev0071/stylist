import { v4 as uuidv4 } from 'uuid';
import{ DB }from '../db/dbHelpers.js';

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
            whoCommentedId:userId,
            whichPostId:postId,
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