import { Router } from 'express';
import { registerUser, loginUser, logoutUser,getUser } from '../controllers/userController.js';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.get('/:userId', getUser);
// userRouter.post('/reset-password', resetPassword);
// userRouter.patch('/change-password/:token', changePassword);

export default userRouter;
