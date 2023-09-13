import  { Router } from "express";
import { createComment} from "../controllers/commentsController.js";
import { authenticateToken } from "../middlewares/index.js";

const commentRouter = Router();

// commentRouter.get('/', getComments);
commentRouter.post("/create", authenticateToken, createComment);

export default commentRouter;