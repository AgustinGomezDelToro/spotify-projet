import { Router } from 'express';
import {
  createAlbum,
  getAlbumById,
  getAlbumByName,
  getAllAlbums,
} from '../controllers/album.controller.ts';

const albumRouter = Router();

albumRouter.get('/', async (req, res) => {
  try {
    const albums = await getAllAlbums();
    res
      .status(200)
      .json({ message: 'All albums getted successfully', albums: albums });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

albumRouter.get('/:id', async (req, res) => {
  try {
    const album = await getAlbumById(req.params.id);
    res.status(200).json({ message: 'Album getted successfully', album });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

albumRouter.get('/name/:title', async (req, res) => {
  try {
    const album = await getAlbumByName(req.params.title);
    res.status(200).json({ message: 'Album retrieved successfully', album });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});


albumRouter.post('/', async (req, res) => {
  try {
    const album = await createAlbum(req.body);  // Usar req.body en lugar de req.body.title
    res.status(201).json({ message: 'Album created successfully', album });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});


export { albumRouter };
