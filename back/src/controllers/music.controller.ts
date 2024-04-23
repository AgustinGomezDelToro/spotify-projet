import { prisma } from '../index.ts';
import { z } from 'zod';
import type { Music } from '@prisma/client';
import { connect, listen } from 'bun';

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

export const getMusicByTitle = async (name: string) => {
  try {
    const music = await prisma.music.findMany({
      where: {
        title: name,
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
  artist: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  albumId: z.string().min(3).max(30).optional(),
  listenNumber: z.number().int().optional(),
});

interface MusicData {
  title: string;
  year: number;
  artist: `0x${string}`;
  albumId: string;
  listenNumber: number | 0;
}

export const createMusic = async (musicData: MusicData) => {
  try {
    const music = MusicSchema.parse(musicData);
    const newMusic: Music = await prisma.music.create({
      data: {
        title: music.title,
        year: music.year,
        listenNumber: 0,
        artist: {
          connect: { walletAddress: music.artist },
        },
        album: {
          connect: { id: music.albumId },
        },
      },
    });
    return newMusic;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
