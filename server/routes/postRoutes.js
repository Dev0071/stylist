import { Router } from "express";
import { createPost, getPosts, savePost, getSavedPosts, deletePost,likePost,likesCount} from "../controllers/postController.js";
import { authenticateToken } from "../middlewares/index.js";

const postRouter = Router();

postRouter.get('/', getPosts);
// postRouter.get('/:id', getPost);
postRouter.get('/mywardrobe', authenticateToken, getSavedPosts);
postRouter.post("/save", authenticateToken, savePost);
postRouter.post('/create', authenticateToken, createPost);
// postRouter.patch('/:id', authenticateToken, updatePost);
postRouter.delete('/:id', authenticateToken, deletePost);
postRouter.post('/like', authenticateToken, likePost )
postRouter.post('/likesCount', likesCount )
export default postRouter;