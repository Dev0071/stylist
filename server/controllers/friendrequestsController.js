import { DB } from "../db/dbHelpers.js";
import { v4 as uuidv4 } from "uuid";

export const sendFriendRequest = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
    
        if (!senderId || !receiverId) {
        return res.status(400).json({ error: "Missing required fields" });
        }
    
        const friendRequestId = uuidv4();
    
        const response = await DB.exec("spCreateFriendRequest", {
        friendRequestId,
        senderId,
        receiverId,
        });
    
        if (response.rowsAffected[0] === 1) {
        return res.status(201).json({ message: "Friend request sent" });
        } else {
        return res.status(500).json({ error: "Failed to send friend request" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const acceptFriendRequest = async (req, res) => {
    try {
        const { friendRequestId, receiverId } = req.body;
    
        if (!friendRequestId || !receiverId) {
        return res.status(400).json({ error: "Missing required fields" });
        }
    
        const response = await DB.exec("spAcceptFriendRequest", {
        friendRequestId,
        receiverId,
        });
    
        if (response.rowsAffected[0] === 1) {
        return res.status(201).json({ message: "Friend request accepted" });
        } else {
        return res.status(500).json({ error: "Failed to accept friend request" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const rejectFriendRequest = async (req, res) => {
    try {
        const { friendRequestId } = req.params;
    
        if (!friendRequestId ) {
        return res.status(400).json({ error: "Missing required fields" });
        }
    
        const response = await DB.exec("spRejectFriendRequest", {
        friendRequestId,
       
        });
    
        if (response.rowsAffected[0] === 1) {
        return res.status(201).json({ message: "Friend request rejected" });
        } else {
        return res.status(500).json({ error: "Failed to reject friend request" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

};