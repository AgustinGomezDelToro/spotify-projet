// En tu archivo de rutas
import { Router } from 'express';
import type { UserData } from '../controllers/user.controller.ts';
import {
  createUser,
  getUser,
  updateUser,
} from '../controllers/user.controller.ts';

export const userRouter = Router();

// Obtener información de usuario por walletAddress
userRouter.get('/me', async (req, res) => {
  try {
    const user = await getUser(req.query.walletAddress as `0x${string}`);
    res.status(200).json({ message: 'User information retrieved successfully', user: user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Crear un nuevo usuario
userRouter.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body as UserData);
    res.status(201).json({ message: 'User created successfully', user: user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un usuario existente
userRouter.put('/', async (req, res) => {
  try {
    // Pasamos todo el objeto req.body a updateUser para actualizar todos los campos relevantes
    await updateUser(req.body as UserData);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
