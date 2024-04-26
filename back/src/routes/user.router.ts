import { Router } from 'express';
import {
  createUser,
  getUser,
  updateUser,
} from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/me', async (req, res) => {
  try {
    const user = await getUser(req.query.walletAddress as `0x${string}`);
    res
      .status(200)
      .json({ message: 'User information getted successfully', user: user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body.walletAddress);
    res.status(201).json({ message: 'User created successfully', user: user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

userRouter.put('/', async (req, res) => {
  try {
    const user = await updateUser(
      req.body.email,
      req.body.username,
      req.body.walletAddress
    );
    res.status(200).json({ message: 'User updated successfully', user: user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
