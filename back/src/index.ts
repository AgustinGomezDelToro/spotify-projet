import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { userRouter } from './routes/user.router.ts';
import { albumRouter } from './routes/album.router.ts';
import { musicRouter } from './routes/music.router.ts';

export const prisma = new PrismaClient();

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/album', albumRouter);
app.use('/api/music', musicRouter);

app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});
