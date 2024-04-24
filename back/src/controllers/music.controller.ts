import { prisma } from '../index.ts';
import { z } from 'zod';

export const getAllMusic = async () => {
  try {
    const music = await prisma.music.findMany();
    return music;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMusicById = async (id: string) => {
  try {
    const music = await prisma.music.findUnique({
      where: {
        id: id,
      },
    });
    return music;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMusicByTitle = async (title: string) => {
  try {
    const music = await prisma.music.findMany({
      where: {
        title: {
          equals: title,
          mode: 'insensitive'
        }
      },
    });
    return music;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


const MusicSchema = z.object({
  title: z.string().min(3).max(30),
  year: z.number().int().positive().finite(),
  artistId: z.string(), // Usar artistId en lugar de artist
  albumId: z.string(),
  listenNumber: z.number().int().nonnegative().optional(),
});
interface MusicData {
  title: string;
  year: number;
  artistId: string;
  albumId: string;
  listenNumber: number;
}

export const createMusic = async (musicData: MusicData) => {
  try {
    const music = MusicSchema.parse(musicData);

    const newMusic = await prisma.music.create({
      data: {
        title: music.title,
        year: music.year,
        listenNumber: music.listenNumber || 0,
        artist: {
          connect: { id: music.artistId },
        },
        album: {
          connect: { id: music.albumId },
        },
      },
    });
    return newMusic;
  } catch (error: any) {
    console.error('Error creating new music:', error);
    throw new Error('Error creating new music: ' + error.message);
  }
};
