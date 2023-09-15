import { Router } from "express";
import { authenticateToken } from "../middlewares/index.js";
import { sendFriendRequest,acceptFriendRequest, rejectFriendRequest } from "../controllers/friendrequestsController.js";

const friendRequestRouter = Router();

friendRequestRouter.post("/send", authenticateToken, sendFriendRequest);
friendRequestRouter.post("/accept", authenticateToken, acceptFriendRequest);
friendRequestRouter.post("/decline/:friendRequestId", authenticateToken, rejectFriendRequest);

export default friendRequestRouter;