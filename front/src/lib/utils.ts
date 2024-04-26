import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface MusicData {
  title: string;
  year: number;
  ipfsHash: string;
  artist: string;
}
