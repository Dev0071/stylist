import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
// userRouter.post('/reset-password', resetPassword);
// userRouter.patch('/change-password/:token', changePassword);

export default userRouter;
