'use client';

import Link from 'next/link';

import { Music, User } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAccount } from 'wagmi';

const Navbar = () => {
  const { address } = useAccount();
  return (
    <header className='flex h-16 items-center justify-between bg-gray-900 px-6 text-gray-50'>
      <Link className='flex items-center gap-2' href='/'>
        <Music className='h-6 w-6' />
        <span className='text-lg font-semibold'>Crypto Tunes</span>
      </Link>
      <nav className='flex items-center gap-4'>
        <Link
          className='text-sm font-medium hover:text-gray-300 focus:text-gray-300'
          href='/'
        >
          Discover
        </Link>
        <Link
          className='text-sm font-medium hover:text-gray-300 focus:text-gray-300'
          href='#'
        >
          Library
        </Link>
        <Link
          className='text-sm font-medium hover:text-gray-300 focus:text-gray-300'
          href='#'
        >
          Playlists
        </Link>
        <Link
          className='text-sm font-medium hover:text-gray-300 focus:text-gray-300'
          href='#'
        >
          Genres
        </Link>
      </nav>
      <div className='flex gap-4 items-center'>
        {address && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='rounded-full' size='icon' variant='ghost'>
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href='/profile'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/upload'>Upload</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Navbar;
