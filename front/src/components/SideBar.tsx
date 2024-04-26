import ButtonConnect from './ButtonConnect';
import Link from 'next/link';

import { Home, Library, ListMusic, Music, Type } from 'lucide-react';

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-[calc(100vh-4rem)]'>
      <aside className='flex flex-col bg-gray-800 p-6 text-gray-300'>
        <div className='mb-6 flex items-center gap-2'>
          <Music className='h-6 w-6' />
          <span className='text-lg font-semibold'>Playlists</span>
        </div>
        <nav className='flex flex-col gap-2'>
          <Link
            className='flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700 hover:text-gray-50 focus:bg-gray-700 focus:text-gray-50'
            href='#'
          >
            <Home className='h-5 w-5' />
            <span className='text-sm font-medium'>Discover</span>
          </Link>
          <Link
            className='flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700 hover:text-gray-50 focus:bg-gray-700 focus:text-gray-50'
            href='#'
          >
            <Library className='h-5 w-5' />
            <span className='text-sm font-medium'>Library</span>
          </Link>
          <Link
            className='flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700 hover:text-gray-50 focus:bg-gray-700 focus:text-gray-50'
            href='#'
          >
            <ListMusic className='h-5 w-5' />
            <span className='text-sm font-medium'>Playlists</span>
          </Link>
          <Link
            className='flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-700 hover:text-gray-50 focus:bg-gray-700 focus:text-gray-50'
            href='#'
          >
            <Type className='h-5 w-5' />
            <span className='text-sm font-medium'>Genres</span>
          </Link>
        </nav>
        <ButtonConnect />
      </aside>
      {children}
    </div>
  );
};

export default SideBar;
