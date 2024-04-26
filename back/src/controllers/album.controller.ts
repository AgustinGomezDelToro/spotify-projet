import { prisma } from '../index';
import { z } from 'zod';
import type { Album } from '@prisma/client';

export const getAllAlbums = async () => {
  try {
    const albums = await prisma.album.findMany();
    return albums;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAlbumById = async (id: string) => {
  try {
    const album = await prisma.album.findUnique({
      where: {
        id: id,
      },
    });
    return album;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAlbumByName = async (name: string) => {
  try {
    const album = await prisma.album.findMany({
      where: {
        title: name,
      },
    });
    return album;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const AlbumSchema = z.object({
  title: z.string().min(3).max(30),
  year: z.number().int().positive().finite(),
  artist: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

interface AlbumData {
  title: string;
  year: number;
  artist: `0x${string}`;
}

export const createAlbum = async (albumData: AlbumData) => {
  try {
    const album = AlbumSchema.parse(albumData);
    const newAlbum: Album = await prisma.album.create({
      data: {
        title: album.title,
        year: album.year,
        artist: {
          connect: {
            walletAddress: album.artist,
          },
        },
      },
    });
    return newAlbum;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
