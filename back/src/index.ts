import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { userRouter } from './routes/user.router';
import { musicRouter } from './routes/music.router';
import { albumRouter } from './routes/album.router';

export const prisma = new PrismaClient();

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/music', musicRouter);
app.use('/api/album', albumRouter);

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
