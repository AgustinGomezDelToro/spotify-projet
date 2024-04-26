import { Router } from 'express';
import multer from 'multer';
import {
  createMusic,
  getAllMusic,
  getMusicById,
  getMusicByTitle,
  uploadMusic,
} from '../controllers/music.controller';

export const musicRouter = Router();
const upload = multer();

musicRouter.get('/', async (req, res) => {
  try {
    const musics = await getAllMusic();
    res.status(200).json({ message: 'All music getted successfully', musics });
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

musicRouter.get('/title', async (req, res) => {
  try {
    const music = await getMusicByTitle(req.query.title as string);
    res.status(200).json({ message: 'Music getted successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

musicRouter.post('/', async (req, res) => {
  try {
    const music = await createMusic(req.body);
    res.status(201).json({ message: 'Music created successfully', music });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

musicRouter.post('/upload', upload.single('music'), async (req, res) => {
  try {
    if (!req.file) throw new Error('Music file is required');
    if (!req.body.title) throw new Error('Music title is required');
    const file = new File([req.file.buffer], req.body.title, {
      type: req.file.mimetype,
    });
    const ipfsHash = await uploadMusic(file);
    console.log('Uploaded', ipfsHash);
    res.status(201).json({ message: 'Music created successfully', ipfsHash });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
