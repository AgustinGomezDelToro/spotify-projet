import { prisma } from '../index';
import { z } from 'zod';
import type { Music } from '@prisma/client';
import { create } from '@web3-storage/w3up-client';

export const getAllMusic = async () => {
  try {
    const musics = await prisma.music.findMany({
      include: {
        artist: true,
        album: true,
      },
    });
    return musics;
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
      include: {
        artist: true,
        album: true,
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
      include: {
        artist: true,
        album: true,
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
  ipfsHash: z.string(),
});

interface MusicData {
  title: string;
  year: number;
  artist: `0x${string}`;
  albumId: string | undefined;
  ipfsHash: string;
  listenNumber: number | 0;
}

export const createMusic = async (musicData: MusicData) => {
  try {
    console.log('musicData', musicData);
    const music = MusicSchema.parse(musicData);
    const newMusic: Music = await prisma.music.create({
      data: {
        title: music.title,
        year: music.year,
        ipfsHash: music.ipfsHash,
        listenNumber: 0,
        artist: {
          connect: { walletAddress: music.artist },
        },
      },
    });
    if (music.albumId) {
      await prisma.music.update({
        where: { id: newMusic.id },
        data: {
          album: {
            connect: { id: music.albumId },
          },
        },
      });
    }
    return newMusic;
  } catch (error: any) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const uploadMusic = async (file: File) => {
  try {
    console.log('Uploading...');
    const client = await create();
    await client.login('theosamarasinghe@gmail.com');
    await client.setCurrentSpace(
      'did:key:z6MkkgsCbnDuQeX9SuKoBx6vsV6ea2nXNVnEuQ9mz5LhY6S9'
    );
    const directoryCid = await client.uploadDirectory([file]);
    return directoryCid.toString();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
