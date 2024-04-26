import { prisma } from '../index';
import { z } from 'zod';
import type { User } from '@prisma/client';

export const getUser = async (walletAddress: `0x${string}`) => {
  try {
    const walletAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
    const address = walletAddressSchema.parse(walletAddress);
    const user = await prisma.user.findUnique({
      where: {
        walletAddress: address,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createUser = async (walletAddress: `0x${string}`) => {
  try {
    const walletAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);
    const address = walletAddressSchema.parse(walletAddress);
    const userExist = await prisma.user.findUnique({
      where: {
        walletAddress: address,
      },
    });
    if (userExist) {
      throw new Error('User already exists');
    }
    const user: User = await prisma.user.create({
      data: {
        walletAddress: address,
      },
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const UserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(30),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
});

export const updateUser = async (
  email: string,
  username: string,
  walletAddress: `0x${string}`
) => {
  try {
    const user = UserSchema.parse({ email, username, walletAddress });
    await prisma.user.update({
      where: {
        walletAddress: user.walletAddress,
      },
      data: {
        username: user.username,
        email: user.email,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
