import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Music,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface MusicCardProps {
  title: string;
  artist: string;
}

const MusicCard = ({ title, artist }: MusicCardProps) => {
  return (
    <div className='flex items-center justify-between bg-blue-950 px-8 py-4 rounded-md'>
      <div className='flex items-center gap-4'>
        <Music className='h-6 w-6 text-gray-50' />
        <div>
          <div className='text-lg font-semibold text-gray-50'>{title}</div>
          <div className='text-sm text-gray-400'>{artist}</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button size='icon' variant='ghost'>
          <ShuffleIcon className='h-6 w-6 text-gray-400' />
        </Button>
        <Button size='icon' variant='ghost'>
          <ArrowLeftIcon className='h-6 w-6 text-gray-400' />
        </Button>
        <Button size='icon' variant='ghost'>
          <PlayIcon className='h-6 w-6 text-gray-50' />
        </Button>
        <Button size='icon' variant='ghost'>
          <ArrowRightIcon className='h-6 w-6 text-gray-400' />
        </Button>
        <Button size='icon' variant='ghost'>
          <RepeatIcon className='h-6 w-6 text-gray-400' />
        </Button>
      </div>
      <div className='flex items-center gap-2'>
        <VolumeIcon className='h-6 w-6 text-gray-400' />
        <Progress className='flex-1' value={75} />
      </div>
    </div>
  );
};

export default MusicCard;
