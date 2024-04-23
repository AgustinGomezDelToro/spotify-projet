import { Router } from 'express';
import {
  createMusic,
  getAllMusic,
  getMusicById,
  getMusicByTitle,
} from '../controllers/music.controller.ts';

const musicRouter = Router();

musicRouter.get('/', async (req, res) => {
  try {
    const music = await getAllMusic();
    res.status(200).json({ message: 'All music getted successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

musicRouter.get('/:id', async (req, res) => {
  try {
    const music = await getMusicById(req.params.id);
    res.status(200).json({ message: 'Music getted successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

musicRouter.get('/music', async (req, res) => {
  try {
    const music = await getMusicByTitle(req.query.title as string);
    res.status(200).json({ message: 'Music getted successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

musicRouter.post('/', async (req, res) => {
  try {
    const music = await createMusic(req.body.title);
    res.status(201).json({ message: 'Music created successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
