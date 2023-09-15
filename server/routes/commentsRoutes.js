import  { Router } from "express";
import { createComment, getComments, deleteComment, commentOnComment, getCommentsOnComment, deleteCommentOnComment} from "../controllers/commentsController.js";
import { authenticateToken } from "../middlewares/index.js";

const commentRouter = Router();

commentRouter.get('/:postId', getComments);
commentRouter.post("/create", authenticateToken, createComment);
commentRouter.delete("/:commentId", authenticateToken, deleteComment);
commentRouter.post("/comment", authenticateToken, commentOnComment);
commentRouter.get("/comment/:commentId", getCommentsOnComment);
commentRouter.delete("/comment/:commentOnCommentId", authenticateToken, deleteCommentOnComment);

export default commentRouter;