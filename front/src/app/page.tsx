import { getAllMusic } from '@/lib/music.action';
import { MusicData } from '@/lib/utils';
import ReactAudioPlayer from 'react-audio-player';
import MusicCard from '@/components/MusicCard';

export default async function Home() {
  const musics = await getAllMusic();
  console.log(musics);
  return (
    <main className='flex-1 bg-gray-900 px-8 py-4'>
      <h1 className='text-white text-4xl mb-4 font-bold'>All musics</h1>
      <MusicCard artist='Keblack' title='Aucune attache' />
      {musics.musics.map((music: any) => (
        <div
          key={music.ipfsHash}
          className='flex items-center justify-between p-4 my-4 bg-gray-800 rounded-lg'
        >
          <div>
            <h2 className='text-xl font-semibold text-gray-100'>
              {music.title}
            </h2>
            <p className='text-gray-400'>{music.artistId}</p>
          </div>
          {/* <div>
            {music.ipfsHash && music.title && (
              <ReactAudioPlayer
                src={`https://${music.ipfsHash}.ipfs.w3s.link/${music.title}`}
                autoPlay
                controls
              />
            )}
          </div> */}
        </div>
      ))}
    </main>
  );
}
