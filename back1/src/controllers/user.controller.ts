import { prisma } from '../index.ts';
import { z } from 'zod';
import type { User } from '@prisma/client';


export interface UserData {
  email: string;
  username: string;
  walletAddress: string;
  isSubscribed: boolean;
  isCreator: boolean;
}
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

export const createUser = async (userData: UserData) => {
  try {
    const { email, username, walletAddress, isSubscribed, isCreator } = UserSchema.parse(userData);


    const userExist = await prisma.user.findUnique({
      where: {
        walletAddress,
      },
    });
    if (userExist) {
      throw new Error('User already exists');
    }

    const user = await prisma.user.create({
      data: {
        email,
        username,
        walletAddress,
        isSubscribed,
        isCreator,
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
  isSubscribed: z.boolean(),
  isCreator: z.boolean(),
});

export const updateUser = async (userData: UserData) => {
  try {
    const { email, username, walletAddress, isSubscribed, isCreator } = UserSchema.parse(userData);

    await prisma.user.update({
      where: {
        walletAddress,
      },
      data: {
        email,
        username,
        isSubscribed,
        isCreator,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

